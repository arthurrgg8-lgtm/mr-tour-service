"use client"

import { motion, type HTMLMotionProps, type Variants } from "framer-motion"
import { ReactNode } from "react"

interface FadeInProps extends HTMLMotionProps<"div"> {
  children: ReactNode
  direction?: "up" | "down" | "left" | "right" | "none"
  delay?: number
  duration?: number
  distance?: number
  className?: string
  once?: boolean
}

export function FadeIn({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  distance = 24,
  className = "",
  once = true,
  ...props
}: FadeInProps) {
  const getInitial = () => {
    switch (direction) {
      case "up": return { opacity: 0, y: distance }
      case "down": return { opacity: 0, y: -distance }
      case "left": return { opacity: 0, x: distance }
      case "right": return { opacity: 0, x: -distance }
      default: return { opacity: 0 }
    }
  }

  return (
    <motion.div
      initial={getInitial()}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: "-40px" }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

interface StaggerContainerProps extends HTMLMotionProps<"div"> {
  children: ReactNode
  staggerDelay?: number
  delayChildren?: number
  className?: string
  once?: boolean
}

export function StaggerContainer({
  children,
  staggerDelay = 0.1,
  delayChildren = 0,
  className = "",
  once = true,
  ...props
}: StaggerContainerProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren,
      },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-40px" }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

interface StaggerItemProps extends HTMLMotionProps<"div"> {
  children: ReactNode
  className?: string
}

export function StaggerItem({
  children,
  className = "",
  ...props
}: StaggerItemProps) {
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <motion.div variants={itemVariants} className={className} {...props}>
      {children}
    </motion.div>
  )
}

interface HoverCardProps extends HTMLMotionProps<"div"> {
  children: ReactNode
  className?: string
  scale?: number
  y?: number
}

export function HoverCard({
  children,
  className = "",
  scale = 1.02,
  y = -4,
  ...props
}: HoverCardProps) {
  return (
    <motion.div
      whileHover={{ y, scale, transition: { duration: 0.25, ease: "easeOut" } }}
      whileTap={{ scale: 0.98 }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

interface FloatProps {
  children: ReactNode
  className?: string
  duration?: number
  distance?: number
}

export function Float({
  children,
  className = "",
  duration = 4,
  distance = 8,
}: FloatProps) {
  return (
    <motion.div
      animate={{
        y: [-distance / 2, distance / 2, -distance / 2],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
