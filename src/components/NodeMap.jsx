import React, { useEffect, useRef } from 'react';

const NodeMap = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { alpha: true });
        let animationFrameId;

        const resize = () => {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = canvas.offsetWidth * dpr;
            canvas.height = canvas.offsetHeight * dpr;
            ctx.scale(dpr, dpr);
        };

        window.addEventListener('resize', resize);
        resize();

        const nodes = Array.from({ length: 12 }, () => ({
            x: Math.random() * canvas.offsetWidth,
            y: Math.random() * canvas.offsetHeight,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            size: Math.random() * 1.5 + 0.5,
            pulse: 0,
        }));

        const drawNodes = (time) => {
            ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

            ctx.strokeStyle = 'rgba(56, 189, 248, 0.08)';
            ctx.lineWidth = 1;

            nodes.forEach((node, i) => {
                node.x += node.vx;
                node.y += node.vy;
                node.pulse = Math.sin(time / 1500 + i) * 0.5 + 0.5;

                if (node.x < 0 || node.x > canvas.offsetWidth) node.vx *= -1;
                if (node.y < 0 || node.y > canvas.offsetHeight) node.vy *= -1;

                // Draw connections - Optimized O(N^2) for small N
                for (let j = i + 1; j < nodes.length; j++) {
                    const node2 = nodes[j];
                    const dx = node.x - node2.x;
                    const dy = node.y - node2.y;
                    const distSq = dx * dx + dy * dy;
                    if (distSq < 10000) { // 100 * 100
                        const opacity = 1 - Math.sqrt(distSq) / 100;
                        ctx.strokeStyle = `rgba(56, 189, 248, ${opacity * 0.1})`;
                        ctx.beginPath();
                        ctx.moveTo(node.x, node.y);
                        ctx.lineTo(node2.x, node2.y);
                        ctx.stroke();
                    }
                }

                // Draw node with a simple core and glow circle instead of shadowBlur
                const alpha = 0.2 + node.pulse * 0.5;

                // Glow
                ctx.fillStyle = `rgba(56, 189, 248, ${alpha * 0.2})`;
                ctx.beginPath();
                ctx.arc(node.x, node.y, (node.size + 4) * (0.8 + node.pulse * 0.4), 0, Math.PI * 2);
                ctx.fill();

                // Core
                ctx.fillStyle = `rgba(56, 189, 248, ${alpha})`;
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(drawNodes);
        };

        drawNodes(0);

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className="w-full h-full opacity-60 pointer-events-none" />;
};

export default NodeMap;

