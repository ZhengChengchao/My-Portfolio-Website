import { useEffect, useRef, useState } from 'react'

function Lightbox({ images, initialIndex = 0, onClose }) {
  const [selectedIndex, setSelectedIndex] = useState(initialIndex)
  const dialogRef = useRef(null)
  const image = images[selectedIndex] ?? images[0]

  // Functional updates let keyboard events use the latest selected image.
  const showPrevious = () => {
    setSelectedIndex((current) => (current - 1 + images.length) % images.length)
  }
  const showNext = () => {
    setSelectedIndex((current) => (current + 1) % images.length)
  }

  useEffect(() => {
    if (images.length === 0) return

    const opener = document.activeElement
    const dialog = dialogRef.current
    const previousBodyOverflow = document.body.style.overflow
    const previousRootOverflow = document.documentElement.style.overflow
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    dialog.querySelector('button').focus()

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault()
        setSelectedIndex((current) => (current - 1 + images.length) % images.length)
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        setSelectedIndex((current) => (current + 1) % images.length)
      } else if (event.key === 'Tab') {
        const buttons = dialog.querySelectorAll('button')
        const first = buttons[0]
        const last = buttons[buttons.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }

    // Keep focus inside even if another page element receives focus indirectly.
    const handleFocus = (event) => {
      if (!dialog.contains(event.target)) dialog.querySelector('button').focus()
    }
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('focusin', handleFocus)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('focusin', handleFocus)
      document.body.style.overflow = previousBodyOverflow
      document.documentElement.style.overflow = previousRootOverflow
      if (opener instanceof HTMLElement && opener.isConnected) opener.focus()
    }
  }, [images.length, onClose])

  if (!image) return null

  const closeFromBackdrop = (event) => {
    if (event.target === event.currentTarget) onClose()
  }

  return (
    <div className="lightbox" onClick={closeFromBackdrop}>
      <div
        className="lightbox__dialog"
        role="dialog"
        aria-modal="true"
        aria-label="Project screenshot viewer"
        ref={dialogRef}
        onClick={closeFromBackdrop}
      >
        <div className="lightbox__toolbar">
          <span aria-live="polite" aria-atomic="true">
            {selectedIndex + 1} / {images.length}
          </span>
          <button type="button" onClick={onClose}>Close ×</button>
        </div>
        <figure className="lightbox__figure" onClick={closeFromBackdrop}>
          <img src={image.src} alt={image.alt ?? ''} />
          <figcaption>{image.caption}</figcaption>
        </figure>
        {images.length > 1 && (
          <div className="lightbox__navigation">
            <button type="button" onClick={showPrevious}>← Previous</button>
            <button type="button" onClick={showNext}>Next →</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Lightbox
