'use client'
import { useEffect, useState } from "react"

const Quotes = () => {
    const sentences = [
        "You will be required to do wrong no matter where you go. It is the basic condition of life, to be required to violate your own identity. At some time, every creature which lives must do so.",
        "It is the ultimate shadow, the defeat of creation; this is the curse at work, the curse that feeds on all life. Everywhere in the universe...",
        "Until a man is twenty-five, he still thinks, every so often, that under the right circumstances he could be the baddest motherfucker in the world.",
        "If I moved to a martial-arts monastery in China and studied real hard for ten years. If my family was wiped out by Colombian drug dealers and I swore myself to revenge…",
        "Hiro used to feel this way, too, but then he ran into Raven...",
        "I don't want comfort. I want God, I want poetry, I want real danger,",
        "I want freedom, I want goodness. I want sin... You can only be the revolution.",
        "It is in your spirit, or it is nowhere.",
    ]
    const [displayText, setDisplayText] = useState("")
    const [currentIndex, setCurrentIndex] = useState(0)
    const [currentSentence, setCurrentSentence] = useState(sentences[0])
    const [isDeleting, setIsDeleting] = useState(false)

    useEffect(() => {
        if (isDeleting) {
            if (displayText.length > 0) {
                const timeout = setTimeout(() => {
                    setDisplayText(prev => prev.slice(0, -1))
                }, 30) // Backspace speed
                return () => clearTimeout(timeout)
            } else {
                setIsDeleting(false)
                setCurrentSentence(sentences[Math.floor(Math.random() * sentences.length)])
                setCurrentIndex(0)
            }
        } else {
            if (currentIndex < currentSentence.length) {
                const timeout = setTimeout(() => {
                    setDisplayText(prev => prev + currentSentence[currentIndex])
                    setCurrentIndex(prev => prev + 1)
                }, 50) // Typing speed
                return () => clearTimeout(timeout)
            } else if (currentIndex === currentSentence.length && displayText.length === currentSentence.length && currentSentence.length > 0) {
                const deleteTimer = setTimeout(() => {
                    setIsDeleting(true)
                }, 3000) // Wait 3 seconds before deleting
                return () => clearTimeout(deleteTimer)
            }
        }
    }, [displayText, currentIndex, currentSentence, isDeleting, sentences])

    return <p className="text-gray-500 text-lg">{displayText}</p>
}

export default Quotes