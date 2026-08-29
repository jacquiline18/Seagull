import React, { useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, Sparkles, FlaskConical, ShieldCheck, Microscope, ChevronRight } from 'lucide-react';
import { COMPANY_INFO } from '../data/sampleProducts';

export const IntroPage = () => {
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  // Floating scientific molecular particles canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Particle nodes for molecular simulation
    const particles = [];
    const numParticles = Math.min(65, Math.floor(window.innerWidth / 20));

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2.5 + 1.2,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        color: Math.random() > 0.4 ? '#00D2FF' : '#38BDF8'
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw subtle connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 210, 255, ${0.18 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw particle nodes
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#00D2FF';
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div 
      style={{
        minHeight: '100vh',
        backgroundColor: '#061528',
        backgroundImage: 'radial-gradient(circle at 50% 30%, #0A2540 0%, #061528 75%, #030B14 100%)',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1.5rem',
        overflow: 'hidden',
        color: '#FFFFFF'
      }}
    >
      {/* Background Interactive Molecular Canvas */}
      <canvas 
        ref={canvasRef} 
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }} 
      />

      {/* Subtle Scientific Glow Rings */}
      <div 
        style={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          border: '1px dashed rgba(0, 210, 255, 0.15)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          animation: 'orbitRotate 40s linear infinite',
          zIndex: 1
        }}
      />
      <div 
        style={{
          position: 'absolute',
          width: '900px',
          height: '900px',
          borderRadius: '50%',
          border: '1px solid rgba(0, 102, 204, 0.08)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      {/* Main Glassmorphic Showcase Container */}
      <div 
        className="container"
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '840px',
          textAlign: 'center'
        }}
      >
        {/* Animated Brand Logo Icon */}
        <div style={{ marginBottom: '2rem', display: 'inline-block' }}>
          <div 
            style={{
              width: '108px',
              height: '108px',
              margin: '0 auto',
              borderRadius: '28px',
              background: 'linear-gradient(135deg, rgba(10, 37, 64, 0.8) 0%, rgba(6, 21, 40, 0.95) 100%)',
              border: '2px solid rgba(0, 210, 255, 0.4)',
              boxShadow: '0 0 35px rgba(0, 210, 255, 0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '12px',
              animation: 'floatSlow 5s ease-in-out infinite'
            }}
          >
            <img 
              src="/seagull-logo.svg" 
              alt="Seagull Logo" 
              style={{ width: '100%', height: '100%', filter: 'drop-shadow(0 0 10px rgba(0, 210, 255, 0.8))' }} 
            />
          </div>
        </div>

        {/* Company Title & Badge */}
        <div style={{ marginBottom: '1.25rem' }}>
          <span 
            className="section-tag dark-tag"
            style={{
              padding: '0.45rem 1.25rem',
              fontSize: '0.85rem',
              letterSpacing: '0.08em'
            }}
          >
            <FlaskConical size={14} />
            <span>Tanzania Nationwide • ISO Standard Scientific Supply</span>
          </span>
        </div>

        <h1 
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2rem, 5.5vw, 3.4rem)',
            fontWeight: 800,
            color: '#FFFFFF',
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            marginBottom: '0.5rem',
            textShadow: '0 4px 20px rgba(0,0,0,0.5)'
          }}
        >
          SEAGULL GENERAL SUPPLY LIMITED
        </h1>

        {/* Tagline Highlight */}
        <div style={{ marginBottom: '1.75rem' }}>
          <span 
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.25rem, 3vw, 1.85rem)',
              fontWeight: 700,
              background: 'linear-gradient(90deg, #00D2FF 0%, #38BDF8 50%, #FFFFFF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block',
              letterSpacing: '0.02em'
            }}
          >
            "Services Beyond Measure!"
          </span>
        </div>

        <p 
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            color: '#CBD5E1',
            maxWidth: '680px',
            margin: '0 auto 2.5rem auto',
            lineHeight: 1.65,
            fontWeight: 400
          }}
        >
          Reliable chemistry, laboratory, and scientific instruments engineered for universities, medical research institutions, industrial QC, and analytical laboratories.
        </p>

        {/* Action Button Group */}
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            flexWrap: 'wrap',
            marginBottom: '3rem'
          }}
        >
          <button 
            onClick={() => navigate('/order-request')}
            className="btn btn-cyan btn-lg"
            style={{
              fontSize: '1.05rem',
              padding: '1rem 2.25rem',
              borderRadius: 'var(--radius-lg)',
              boxShadow: '0 8px 30px rgba(46, 139, 201, 0.45)',
              backgroundColor: '#2E8BC9',
              color: '#FFFFFF'
            }}
          >
            <span>Request Laboratory Order</span>
            <ArrowRight size={19} />
          </button>

          <button 
            onClick={() => navigate('/products')}
            className="btn btn-outline-white btn-lg"
            style={{
              fontSize: '1.05rem',
              padding: '1rem 2rem',
              borderRadius: 'var(--radius-lg)'
            }}
          >
            <span>Explore Scientific Catalogue</span>
          </button>
        </div>

        {/* Quick Trust Pillars */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.25rem',
            paddingTop: '2rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            textAlign: 'left'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ color: '#00D2FF', background: 'rgba(0, 210, 255, 0.1)', padding: '8px', borderRadius: 'var(--radius-md)' }}>
              <Microscope size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#FFFFFF' }}>Analytical Precision</div>
              <div style={{ fontSize: '0.78rem', color: '#94A3B8' }}>Calibrated lab instruments</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ color: '#00D2FF', background: 'rgba(0, 210, 255, 0.1)', padding: '8px', borderRadius: 'var(--radius-md)' }}>
              <ShieldCheck size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#FFFFFF' }}>Certified Warranty</div>
              <div style={{ fontSize: '0.78rem', color: '#94A3B8' }}>Guaranteed reliability</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ color: '#00D2FF', background: 'rgba(0, 210, 255, 0.1)', padding: '8px', borderRadius: 'var(--radius-md)' }}>
              <Sparkles size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#FFFFFF' }}>Instant Quotations</div>
              <div style={{ fontSize: '0.78rem', color: '#94A3B8' }}>Formal institutional invoices</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
