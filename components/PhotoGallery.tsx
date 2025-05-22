import Image from 'next/image'

interface PhotoGalleryProps {
    images: string[]
}

export function PhotoGallery({ images }: PhotoGalleryProps) {
    const rotations = ['rotate-2', '-rotate-2', 'rotate-2', 'rotate-2', '-rotate-2']

    return (
        <div className="mt-12 sm:mt-16 relative z-10">
            <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
                {images.slice(0, 5).map((src, index) => (
                    <div
                        key={index}
                        className={`relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 sm:w-72 sm:rounded-2xl dark:bg-zinc-800 ${rotations[index]}`}
                    >
                        <Image
                            src={src}
                            alt={`Gallery image ${index + 1}`}
                            fill
                            className="absolute inset-0 h-full w-full object-cover"
                            sizes="(min-width: 640px) 18rem, 11rem"
                        />
                    </div>
                ))}
            </div>
        </div>
    )
} 