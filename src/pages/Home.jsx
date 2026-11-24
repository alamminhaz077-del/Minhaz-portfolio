import Seo from '../components/Seo'
import Hero from '../components/home/Hero'
import { AboutSnapshot, CtaBand, FeaturedWork, SkillsSnapshot } from '../components/home/Sections'

export default function Home() {
  return (
    <>
      <Seo path="/" />
      <Hero />
      <FeaturedWork />
      <SkillsSnapshot />
      <AboutSnapshot />
      <CtaBand />
    </>
  )
}
