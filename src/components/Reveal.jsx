import React, { useEffect, useRef } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'

const Reveal = ({ children, width = 'fit-content' }) => {

    const ref = useRef(null)

    const isInView = useInView(ref, { once: true, margin: '0px 0px -40px 0px' })

    const mainControls = useAnimation()

    useEffect(() => {
        if (isInView) {
            mainControls.start('visible')
        }
    }, [isInView, mainControls])

  return (
    <div ref={ref} style={{ position: 'relative', width, overflow: 'hidden' }}>

        <motion.div
        variants={{
            hidden: { opacity: 0, y: 24 },
            visible: { opacity: 1, y: 0 }, 
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.35, delay: 0.05, ease: 'easeOut' }}
        >
            {children}
        </motion.div>
        
    </div>
  )
}

export default Reveal