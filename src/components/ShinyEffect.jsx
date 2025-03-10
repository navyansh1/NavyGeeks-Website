import React, { useEffect, useState } from 'react'

const ShinyEffect = ({left, right, top, size = 500}) => {
    const [rotation, setRotation] = useState(0);
    
    // Create animation for the gradient rotation
    useEffect(() => {
        const interval = setInterval(() => {
            setRotation(prev => (prev + 1) % 360);
        }, 50);
        
        return () => clearInterval(interval);
    }, []);
    
    const positionStyles = {
        top: `${top}px`,
        width: `${size}px`,
        height: `${size}px`,
        zIndex: -1,
        background: `radial-gradient(circle, 
            rgba(178, 19, 202, 0.3) 0%, 
            rgba(240, 60, 220, 0.2) 30%, 
            rgba(120, 40, 180, 0.1) 70%, 
            transparent 100%)`,
        animation: 'pulse 8s infinite alternate',
        transform: `rotate(${rotation}deg)`,
        transition: 'transform 0.05s linear'
    }
    
    if (left !== undefined) {
        positionStyles.left = `${left}px`
    }
    if (right !== undefined) {
        positionStyles.right = `${right}px`
    }
    
    return (
        <div className='shiny-effect' style={positionStyles}></div>
    )
}

export default ShinyEffect
