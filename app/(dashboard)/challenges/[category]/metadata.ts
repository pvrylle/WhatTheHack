import type { Metadata, ResolvingMetadata } from 'next'
import { siteConfig } from '@/lib/seo'
import { getSupabaseAdmin } from '@/lib/supabase'

type Props = {
  params: Promise<{ category: string }>
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { category } = await params
  
  try {
    const supabase = getSupabaseAdmin()

    const { data: categoryData, error } = await supabase
      .from('categories')
      .select('*')
      .eq('id', category)
      .single()

    if (error || !categoryData) {
      return {
        title: 'Mission Not Found',
        description: 'The requested mission could not be found.',
      }
    }

    const { count: totalChallenges } = await supabase
      .from('challenges')
      .select('*', { count: 'exact', head: true })
      .eq('category_id', category)

    const title = `${categoryData.name} | Challenges`
    const description = `${categoryData.description} Complete ${totalChallenges || 0} challenges to master ${categoryData.name.toLowerCase()}.`

    return {
      title,
      description,
      keywords: [
        categoryData.name.toLowerCase(),
        'challenges',
        'cybersecurity',
        'hacking',
        'learning',
        category.replace(/-/g, ' '),
      ],
      openGraph: {
        title: `${title} | ${siteConfig.name}`,
        description,
        type: 'website',
        url: `${siteConfig.url}/challenges/${category}`,
        siteName: siteConfig.name,
      },
      twitter: {
        card: 'summary_large_image',
        title: `${title} | ${siteConfig.name}`,
        description,
      },
      alternates: {
        canonical: `/challenges/${category}`,
      },
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {
      title: 'Challenges',
      description: 'Cybersecurity challenges and learning paths.',
    }
  }
}

export async function generateStaticParams() {
  try {
    const supabase = getSupabaseAdmin()
    const { data: categories } = await supabase
      .from('categories')
      .select('id')

    return (categories || []).map((category) => ({
      category: category.id,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}
