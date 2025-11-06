import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Play, Clock, BookOpen } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const sampleVideos = [
  {
    title: 'Introduction to Quantum Physics',
    duration: '12:34',
    chapters: 5,
    thumbnail: 'https://images.unsplash.com/photo-1647539761535-e55f1c25e02a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    category: 'Science',
  },
  {
    title: 'Advanced Machine Learning',
    duration: '18:45',
    chapters: 7,
    thumbnail: 'https://images.unsplash.com/photo-1694878981999-83abf0052374?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    category: 'Technology',
  },
  {
    title: 'History of Ancient Rome',
    duration: '15:20',
    chapters: 6,
    thumbnail: 'https://images.unsplash.com/photo-1728302732935-421062dcd60f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    category: 'History',
  },
  {
    title: 'Business Strategy Fundamentals',
    duration: '10:15',
    chapters: 4,
    thumbnail: 'https://images.unsplash.com/photo-1759456629068-205f242feccd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    category: 'Business',
  },
];

export function SampleVideosSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 bg-green-100 rounded-full text-green-700 mb-4">
            Sample Playlists
          </div>
          <h2 className="text-gray-900 mb-4">
            See Pius AI in Action
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore sample video playlists generated from real documents. 
            Click on any video to see the interactive learning interface.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sampleVideos.map((video, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300">
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden bg-gray-200">
                  <ImageWithFallback
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Play Button Overlay */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                      className="w-16 h-16 bg-white rounded-full flex items-center justify-center"
                    >
                      <Play className="text-purple-600 ml-1" size={28} fill="currentColor" />
                    </motion.div>
                  </motion.div>

                  {/* Category Badge */}
                  <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs text-gray-900">
                    {video.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-gray-900 mb-3 group-hover:text-purple-600 transition-colors line-clamp-2">
                    {video.title}
                  </h3>
                  
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{video.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen size={14} />
                      <span>{video.chapters} chapters</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-3 h-1 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${Math.random() * 60 + 20}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                      className="h-full bg-gradient-to-r from-purple-600 to-blue-600"
                    />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Show More Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <button className="text-purple-600 hover:text-purple-700 transition-colors">
            View All Sample Playlists →
          </button>
        </motion.div>
      </div>
    </section>
  );
}
