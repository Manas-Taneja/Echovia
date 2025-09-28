import { useState } from "react";
import type { Route } from "./+types/new-user";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "Welcome • Aura-Aware" },
		{ name: "description", content: "Welcome to Aura-Aware" },
	];
}

// Background SVG with texture
const BG_SVG = (
	<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100 100" fill="none" aria-hidden style={{ position: "absolute", inset: 0 }}>
		<rect width="100%" height="100%" fill="#E8DCCA"/>
		<defs>
			<filter id="grain-filter" x="0%" y="0%" width="100%" height="100%" filterUnits="objectBoundingBox" colorInterpolationFilters="sRGB">
				<feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" result="noise" seed="572"/>
				<feColorMatrix in="noise" type="luminanceToAlpha" result="alphaNoise"/>
				<feComponentTransfer in="alphaNoise" result="coloredNoise">
					<feFuncA type="discrete" tableValues="1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0"/>
				</feComponentTransfer>
				<feFlood floodColor="rgba(0, 0, 0, 0.03)" result="grainColor"/>
				<feComposite operator="in" in2="coloredNoise" in="grainColor" result="grain"/>
			</filter>
		</defs>
		<rect width="100%" height="100%" fill="url(#grain-filter)" opacity="0.4"/>
	</svg>
);

// Chevron arrow component
function ChevronArrow({ opacity = 1 }: { opacity?: number }) {
	return (
		<svg 
			width="16" 
			height="16" 
			viewBox="0 0 16 16" 
			fill="none" 
			xmlns="http://www.w3.org/2000/svg"
			style={{ opacity }}
		>
			<path 
				d="M4 10L8 6L12 10" 
				stroke="#666" 
				strokeWidth="2" 
				strokeLinecap="round" 
				strokeLinejoin="round"
			/>
		</svg>
	);
}

// Gradient control component with swipe functionality
function GradientControl() {
	const [pressed, setPressed] = useState(false);
	const [swipeProgress, setSwipeProgress] = useState(0);
	const [startY, setStartY] = useState(0);
	const [buttonPosition, setButtonPosition] = useState(0);
	
	const handleGoClick = () => {
		// Navigate to login page
		window.location.href = "/login";
	};
	
	const handleTouchStart = (e: React.TouchEvent) => {
		setStartY(e.touches[0].clientY);
		setPressed(true);
	};
	
	const handleTouchMove = (e: React.TouchEvent) => {
		if (!pressed) return;
		
		const currentY = e.touches[0].clientY;
		const deltaY = startY - currentY; // Positive when swiping up
		const maxDistance = 120; // Distance to middle chevron
		
		// Constrain movement: only allow upward movement, max 120px
		const constrainedDeltaY = Math.max(0, Math.min(maxDistance, deltaY));
		const progress = constrainedDeltaY / maxDistance;
		
		setSwipeProgress(progress);
		setButtonPosition(constrainedDeltaY);
	};
	
	const handleTouchEnd = () => {
		if (swipeProgress > 0.8) {
			// Swipe threshold reached - navigate to login
			handleGoClick();
		}
		
		// Reset state
		setPressed(false);
		setSwipeProgress(0);
		setButtonPosition(0);
		setStartY(0);
	};
	
	return (
		<div style={{ 
			position: "relative",
			width: 175,
			height: 300,
			borderRadius: 30,
			background: "linear-gradient(to bottom, rgba(118, 177, 5, 0.5) 20%, rgba(110, 164, 4, 0.5) 30%, rgba(101, 151, 4, 0.5) 40%, rgba(93, 139, 4, 0.5) 50%, rgba(84, 126, 3, 0.5) 60%, rgba(76, 113, 3, 0.5) 70%, rgba(67, 101, 3, 0.5) 80%, rgba(59, 88, 2, 0.5) 90%, rgba(50, 75, 2, 0.5))",
			boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			justifyContent: "space-between",
			padding: "20px 0",
			overflow: "hidden"
		}}>
			{/* Top section with chevron arrows */}
			<div style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				gap: 12,
				marginTop: 20
			}}>
				<ChevronArrow opacity={0.3} />
				<ChevronArrow opacity={0.5} />
				<ChevronArrow opacity={0.8} />
			</div>
			
			{/* Swipe area */}
			<div 
				style={{
					position: "relative",
					width: 120,
					height: 110,
					borderRadius: 35,
					background: "linear-gradient(to top, #324B02 20%, #3B5802 30%, #436503 40%, #4C7103 50%, #547E03 60%, #5D8B04 70%, #659704 80%, #6EA404 90%, #76B105)",
					boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.2), 0 2px 8px rgba(0, 0, 0, 0.1)",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					cursor: "pointer",
					transition: pressed ? "none" : "all 0.3s ease",
					transform: pressed ? `translateY(${-buttonPosition}px)` : "translateY(0px)",
					overflow: "hidden",
					marginBottom: 20
				}}
				onTouchStart={handleTouchStart}
				onTouchMove={handleTouchMove}
				onTouchEnd={handleTouchEnd}
			>
				<span style={{
					color: "#fff",
					fontSize: 18,
					fontWeight: 600,
					letterSpacing: 1,
					position: "relative",
					zIndex: 1
				}}>
					{swipeProgress > 1 ? "GO!" : "GO"}
				</span>
			</div>
		</div>
	);
}

// Echovia image component
function EchoviaImage() {
	return (
		<div style={{
			width: 250,
			height: 250,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			position: "relative"
		}}>
			<img 
				src="/Echovia.png" 
				alt="Echovia" 
				style={{
					width: "100%",
					height: "100%",
					objectFit: "contain"
				}}
			/>
		</div>
	);
}

export default function NewUserPage() {
	return (
		<div style={{ 
			width: "100vw", 
			height: "100vh", 
			position: "fixed",
			top: 0,
			left: 0,
			background: "#E8DCCA",
			display: "flex", 
			flexDirection: "column", 
			alignItems: "center",
			justifyContent: "space-between",
			padding: "60px 0 80px 0"
		}}>
			{/* Top section - Echovia Image */}
			<div style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				gap: 20
			}}>
				<EchoviaImage />
			</div>
			
			{/* Bottom section - Gradient Control */}
			<div style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				gap: 20
			}}>
				<GradientControl />
			</div>
		</div>
	);
}
