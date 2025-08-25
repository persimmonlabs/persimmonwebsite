'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { SectionContainer } from '../SectionContainer'
import { Monitor, Smartphone, CheckCircle, Calendar, BarChart3, Bell, Users, Zap, Lock, Sparkles } from 'lucide-react'

const dashboardFeatures = [
  {
    icon: Monitor,
    title: 'Web Dashboard',
    description: 'Beautiful interface to manage all your content from one place'
  },
  {
    icon: CheckCircle,
    title: 'One-Click Approvals',
    description: 'Approve, edit, or reject content instantly'
  },
  {
    icon: Calendar,
    title: 'Visual Calendar',
    description: 'Drag and drop to reschedule posts across all platforms'
  },
  {
    icon: BarChart3,
    title: 'Real-Time Analytics',
    description: 'Track performance and get AI-powered insights'
  },
  {
    icon: Bell,
    title: 'Smart Notifications',
    description: 'Get alerted only for what matters via Slack, email, or SMS'
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Multiple users with role-based permissions'
  }
]

export const DashboardPreviewSection: React.FC = () => {
  return (
    <SectionContainer className="py-24 bg-gradient-to-b from-gray-900 to-black text-white relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-persimmon-orange rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-persimmon-coral rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center space-x-2 bg-persimmon-orange/20 px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-persimmon-orange" />
              <span className="text-sm font-semibold text-persimmon-orange">Coming Q2 2025</span>
            </div>
            
            <h2 className="font-display font-bold text-4xl lg:text-5xl mb-4">
              Introducing the <span className="gradient-text">Persimmon Dashboard</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Your command center for content automation. After we build your custom n8n workflows, 
              you get a beautiful dashboard to manage everything — no technical skills required.
            </p>
          </motion.div>
        </div>

        {/* Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-2 border border-gray-700">
            <div className="bg-gray-900 rounded-xl p-8">
              {/* Mock Dashboard UI */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-persimmon-orange to-persimmon-coral rounded-lg" />
                  <div>
                    <h3 className="font-semibold">Your Brand Dashboard</h3>
                    <p className="text-sm text-gray-400">Welcome back! You have 5 posts awaiting approval.</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <div className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">Live</div>
                  <div className="px-3 py-1 bg-gray-700 rounded-full text-sm">Plan: Growth</div>
                </div>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-800 rounded-lg p-4">
                  <p className="text-gray-400 text-xs mb-1">This Week</p>
                  <p className="text-2xl font-bold">28</p>
                  <p className="text-xs text-green-400">Posts Published</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <p className="text-gray-400 text-xs mb-1">Engagement</p>
                  <p className="text-2xl font-bold">+47%</p>
                  <p className="text-xs text-green-400">vs Last Week</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <p className="text-gray-400 text-xs mb-1">Pending</p>
                  <p className="text-2xl font-bold">5</p>
                  <p className="text-xs text-yellow-400">Need Approval</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <p className="text-gray-400 text-xs mb-1">Scheduled</p>
                  <p className="text-2xl font-bold">42</p>
                  <p className="text-xs text-blue-400">Next 7 Days</p>
                </div>
              </div>

              {/* Content Preview */}
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-sm">Awaiting Approval</h4>
                  <button className="text-persimmon-orange text-sm">View All →</button>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gray-600 rounded" />
                      <div>
                        <p className="text-sm font-medium">Instagram Post - Product Launch</p>
                        <p className="text-xs text-gray-400">Scheduled for tomorrow at 2:00 PM</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 bg-green-500 text-white rounded text-sm">Approve</button>
                      <button className="px-3 py-1 bg-gray-600 text-white rounded text-sm">Edit</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {dashboardFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-persimmon-orange/50 transition-colors"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-persimmon-orange/20 to-persimmon-coral/20 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-persimmon-orange" />
              </div>
              <h3 className="font-display font-bold text-lg mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-persimmon-orange/10 to-persimmon-coral/10 rounded-2xl p-8 border border-persimmon-orange/20">
            <Lock className="w-12 h-12 text-persimmon-orange mx-auto mb-4" />
            <h3 className="font-display font-bold text-2xl mb-4">
              How the Dashboard Works
            </h3>
            <div className="max-w-2xl mx-auto space-y-3 text-gray-300">
              <p>1. We build your custom n8n automation workflows during setup</p>
              <p>2. Your dashboard connects securely to your workflows</p>
              <p>3. You control everything from the dashboard — approve content, upload assets, view analytics</p>
              <p>4. The automation runs 24/7 while you manage it from anywhere</p>
            </div>
            <div className="mt-6">
              <span className="text-persimmon-orange font-semibold">
                No code. No complexity. Just control.
              </span>
            </div>
          </div>
        </motion.div>

        {/* Mobile App Teaser */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center space-x-2 text-gray-400">
            <Smartphone className="w-5 h-5" />
            <span className="text-sm">Mobile apps coming Q3 2025</span>
          </div>
        </motion.div>
      </div>
    </SectionContainer>
  )
}