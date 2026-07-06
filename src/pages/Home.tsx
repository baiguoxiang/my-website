import { Hero } from '@/components/Hero';
import { CategorySection } from '@/components/CategorySection';
import { categories } from '@/data/agents';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Hero />
      
      <section id="categories" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient">智能体分类</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              根据您的需求，选择对应的智能体板块，开启AI赋能之旅
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <CategorySection key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}