import type { Metadata, ResolvingMetadata } from 'next'
import { siteConfig } from '@/lib/seo'
import { getSupabaseAdmin } from '@/lib/supabase'

type Props = {
  params: Promise<{ category: string; id: string }>
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { category, id } = await params
  
  try {
    const supabase = getSupabaseAdmin()

    const { data: challenge, error } = await supabase
      .from('challenges')
      .select(`
        *,
        categories:category_id (
          name
        )
      `)
      .eq('id', id)
      .eq('category_id', category)
      .single()

    if (error || !challenge) {
      return {
        title: 'Challenge Not Found',
        description: 'The requested challenge could not be found.',
      }
    }

    const categoryName = challenge.categories?.name || category
    const title = `${challenge.title} - ${categoryName} Challenge`
    const description = `${challenge.description}. Difficulty: ${challenge.difficulty}. Earn ${challenge.xp_reward} XP.`
    const url = `${siteConfig.url}/challenges/${category}/${id}`

    return {
      title,
      description,
      keywords: [
        categoryName.toLowerCase(),
        challenge.difficulty.toLowerCase(),
        'hacking challenge',
        'security exercise',
        'cybersecurity',
      ],
      openGraph: {
        title: `${title} | ${siteConfig.name}`,
        description,
        url,
        type: 'website',
        siteName: siteConfig.name,
      },
      twitter: {
        card: 'summary_large_image',
        title: `${title} | ${siteConfig.name}`,
        description,
      },
      alternates: {
        canonical: `/challenges/${category}/${id}`,
      },
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {
      title: 'Challenge',
      description: 'A cybersecurity challenge.',
    }
  }
}

export async function generateStaticParams() {
  try {
    const supabase = getSupabaseAdmin()
    const { data: challenges } = await supabase
      .from('challenges')
      .select('id, category_id')

    return (challenges || []).map((challenge) => ({
      category: challenge.category_id,
      id: challenge.id,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}
