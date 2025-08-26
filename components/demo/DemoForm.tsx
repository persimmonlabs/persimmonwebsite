'use client'

import React from 'react'
import { Upload, Link2, Image, Type, Target, Palette } from 'lucide-react'

export type Platform = 'instagram' | 'linkedin' | 'twitter' | 'facebook'
export type ContentGoal = 'awareness' | 'lead_gen' | 'launch' | 'promo'
export type VoiceTone = 'professional' | 'friendly' | 'playful' | 'bold'
export type PostType = 'photo_caption' | 'carousel' | 'long_post' | 'infographic' | 'auto'

export interface DemoFormData {
  uploadedFile: File | null
  url: string
  description: string
  contentGoal: ContentGoal
  brandName: string
  brandColors: string
  voiceTone: VoiceTone
  postType: PostType
  platforms: Platform[]
  email: string
}

interface DemoFormProps {
  formData: DemoFormData
  setFormData: (data: DemoFormData) => void
  onNext: () => void
  onBack?: () => void
  step: number
}

const contentGoalLabels: Record<ContentGoal, string> = {
  awareness: 'Brand Awareness',
  lead_gen: 'Lead Generation',
  launch: 'Product Launch',
  promo: 'Promotion'
}

const contentGoalIcons = {
  awareness: Target,
  lead_gen: Target,
  launch: Target,
  promo: Target
}

export const DemoFormStep1: React.FC<Pick<DemoFormProps, 'formData' | 'setFormData' | 'onNext'>> = ({
  formData,
  setFormData,
  onNext
}) => {
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData({ ...formData, uploadedFile: file })
    }
  }

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
        <div className="w-10 h-10 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-lg flex items-center justify-center mr-3">
          <Upload className="w-6 h-6 text-white" />
        </div>
        Step 1: Your Content Source
      </h3>

      <div className="grid md:grid-cols-2 gap-6">
        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Upload an Image
          </label>
          <div className="relative">
            <input
              type="file"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
              accept="image/*"
            />
            <label
              htmlFor="file-upload"
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-brand-primary/30 rounded-xl cursor-pointer bg-gradient-to-br from-brand-dark/40 to-transparent hover:from-brand-dark/40 transition-all"
            >
              <Image className="w-8 h-8 text-brand-primary mb-2" />
              <p className="text-sm text-gray-300">
                {formData.uploadedFile ? formData.uploadedFile.name : 'Click to upload or drag and drop'}
              </p>
              <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 10MB</p>
            </label>
          </div>
        </div>

        {/* URL Input */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Or Paste a URL
          </label>
          <div className="relative">
            <Link2 className="absolute left-3 top-3 w-5 h-5 text-brand-primary" />
            <input
              type="url"
              placeholder="https://example.com/article"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              className="w-full pl-10 pr-3 py-3 border border-brand-wine/30 bg-brand-dark/20 text-white rounded-xl focus:ring-2 focus:ring-persimmon-coral focus:border-transparent placeholder-gray-500"
            />
          </div>
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          What would you like to create?
        </label>
        <textarea
          placeholder="E.g., Promote our new coffee blend launch, share a customer success story..."
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-4 py-3 border border-brand-wine/30 bg-brand-dark/20 text-white rounded-xl focus:ring-2 focus:ring-persimmon-coral focus:border-transparent placeholder-gray-500"
          rows={3}
        />
      </div>

      {/* Content Goal */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          <Target className="inline w-4 h-4 mr-1 text-brand-primary" />
          Content Goal
        </label>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
          {(['awareness', 'lead_gen', 'launch', 'promo'] as ContentGoal[]).map((goal) => {
            const Icon = contentGoalIcons[goal]
            return (
              <button
                key={goal}
                onClick={() => setFormData({ ...formData, contentGoal: goal })}
                className={`relative px-3 sm:px-4 py-3 rounded-xl border-2 transition-all transform hover:scale-105 min-h-[48px] ${
                  formData.contentGoal === goal
                    ? 'border-brand-primary bg-gradient-to-br from-brand-primary to-brand-secondary text-white shadow-lg shadow-persimmon-coral/30'
                    : 'border-brand-wine/30 bg-brand-dark/10 text-gray-300 hover:border-brand-primary/50 hover:bg-brand-dark/20'
                }`}
              >
                <Icon className="w-5 h-5 mx-auto mb-1" />
                <span className="text-sm font-medium">{contentGoalLabels[goal]}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={onNext}
          className="group px-6 py-3 bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-persimmon-coral/30 transition-all transform hover:scale-105"
        >
          Next: Brand Details
        </button>
      </div>
    </div>
  )
}

export const DemoFormStep2: React.FC<Pick<DemoFormProps, 'formData' | 'setFormData' | 'onNext' | 'onBack'>> = ({
  formData,
  setFormData,
  onNext,
  onBack
}) => {
  const togglePlatform = (platform: Platform) => {
    const platforms = formData.platforms.includes(platform)
      ? formData.platforms.filter(p => p !== platform)
      : [...formData.platforms, platform]
    setFormData({ ...formData, platforms })
  }

  const platformIcons = {
    instagram: '📷',
    linkedin: '💼',
    twitter: '🐦',
    facebook: '📘'
  }

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
        <div className="w-10 h-10 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-lg flex items-center justify-center mr-3">
          <Palette className="w-6 h-6 text-white" />
        </div>
        Step 2: Brand & Platforms
      </h3>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Brand Name */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Brand Name
          </label>
          <input
            type="text"
            placeholder="Your Company"
            value={formData.brandName}
            onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
            className="w-full px-4 py-3 border border-brand-wine/30 bg-brand-dark/20 text-white rounded-xl focus:ring-2 focus:ring-persimmon-coral focus:border-transparent placeholder-gray-500"
          />
        </div>

        {/* Brand Colors */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Brand Colors (Optional)
          </label>
          <input
            type="text"
            placeholder="#FF6B35, #004E98"
            value={formData.brandColors}
            onChange={(e) => setFormData({ ...formData, brandColors: e.target.value })}
            className="w-full px-4 py-3 border border-brand-wine/30 bg-brand-dark/20 text-white rounded-xl focus:ring-2 focus:ring-persimmon-coral focus:border-transparent placeholder-gray-500"
          />
        </div>
      </div>

      {/* Voice Tone */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          <Type className="inline w-4 h-4 mr-1 text-brand-primary" />
          Voice Tone
        </label>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
          {(['professional', 'friendly', 'playful', 'bold'] as VoiceTone[]).map((tone) => (
            <button
              key={tone}
              onClick={() => setFormData({ ...formData, voiceTone: tone })}
              className={`px-3 sm:px-4 py-3 rounded-xl border-2 transition-all transform hover:scale-105 min-h-[48px] ${
                formData.voiceTone === tone
                  ? 'border-brand-primary bg-gradient-to-br from-brand-primary to-brand-secondary text-white shadow-lg shadow-persimmon-coral/30'
                  : 'border-brand-wine/30 bg-brand-dark/10 text-gray-300 hover:border-brand-primary/50 hover:bg-brand-dark/20'
              }`}
            >
              <span className="font-medium capitalize">{tone}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Platforms */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          Select Platforms
        </label>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
          {(['instagram', 'linkedin', 'twitter', 'facebook'] as Platform[]).map((platform) => (
            <button
              key={platform}
              onClick={() => togglePlatform(platform)}
              className={`px-3 sm:px-4 py-3 rounded-xl border-2 transition-all transform hover:scale-105 min-h-[48px] ${
                formData.platforms.includes(platform)
                  ? 'border-brand-primary bg-gradient-to-br from-brand-primary to-brand-secondary text-white shadow-lg shadow-persimmon-coral/30'
                  : 'border-brand-wine/30 bg-brand-dark/10 text-gray-300 hover:border-brand-primary/50 hover:bg-brand-dark/20'
              }`}
            >
              <span className="text-xl mb-1">{platformIcons[platform]}</span>
              <span className="block text-sm font-medium capitalize">{platform}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="px-6 py-3 border-2 border-brand-wine/30 text-gray-300 font-semibold rounded-xl hover:border-brand-primary/50 hover:bg-brand-dark/20 transition-all"
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={formData.platforms.length === 0}
          className="group px-6 py-3 bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-persimmon-coral/30 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Generate Content
        </button>
      </div>
    </div>
  )
}