import Image from 'next/image';
import { characters } from '@/lib/characters';

export default function CharacterGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {characters.map((character) => (
        <div
          key={character.id}
          className="bg-black/20 backdrop-blur-sm rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
        >
          <div className="relative h-[400px] w-full">
            <Image
              src={character.image}
              alt={character.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">{character.name}</h3>
            {character.model && (
              <p className="text-sm text-cyan-400 mb-2">Model: {character.model}</p>
            )}
            <p className="text-sm text-gray-300">{character.description}</p>
            <span className="inline-block mt-2 px-3 py-1 bg-cyan-900/50 rounded-full text-xs">
              {character.role}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
} 