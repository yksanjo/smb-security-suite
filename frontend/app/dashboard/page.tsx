'use client'

import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Layout } from '@/components/Layout'
import api from '@/lib/api'
import { Shield, Activity, Cloud, Zap, AlertTriangle } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['dashboard'],
    queryFn: async () => {
      const response = await api.get('/dashboard')
      return response.data
    },
  })

  if (isLoading) {
    return (
      <Layout>
        <div className="text-center py-12">Loading dashboard...</div>
      </Layout>
    )
  }

  const summary = data?.summary || {}
  const recentCritical = data?.recentCritical || []

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Security Dashboard</h1>
          <p className="text-gray-600">Overview of your security posture</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <SummaryCard
            title="Attack Surface"
            icon={Shield}
            total={summary.attackSurface?.total || 0}
            open={summary.attackSurface?.open || 0}
            critical={summary.attackSurface?.critical || 0}
            high={summary.attackSurface?.high || 0}
            href="/attack-surface"
          />
          <SummaryCard
            title="Log Intelligence"
            icon={Activity}
            total={summary.logIntelligence?.total || 0}
            open={summary.logIntelligence?.open || 0}
            critical={summary.logIntelligence?.critical || 0}
            high={summary.logIntelligence?.high || 0}
            href="/logs"
          />
          <SummaryCard
            title="Cloud Monitor"
            icon={Cloud}
            total={summary.cloudMonitor?.total || 0}
            open={summary.cloudMonitor?.open || 0}
            critical={summary.cloudMonitor?.critical || 0}
            high={summary.cloudMonitor?.high || 0}
            href="/cloud"
          />
          <SummaryCard
            title="Pentest"
            icon={Zap}
            total={summary.pentest?.total || 0}
            open={summary.pentest?.open || 0}
            critical={summary.pentest?.critical || 0}
            high={summary.pentest?.high || 0}
            href="/pentest"
          />
        </div>

        {/* Recent Critical Findings */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <AlertTriangle className="text-danger-500" />
            Recent Critical & High Severity Findings
          </h2>
          {recentCritical.length === 0 ? (
            <p className="text-gray-600">No critical findings. Great job!</p>
          ) : (
            <div className="space-y-3">
              {recentCritical.map((finding: any) => (
                <Link
                  key={finding.id}
                  href={`/${finding.source.replace('_', '-')}/findings/${finding.id}`}
                  className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-semibold">{finding.title}</div>
                      <div className="text-sm text-gray-600 mt-1">
                        {finding.source.replace('_', ' ')} • {finding.severity}
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        finding.severity === 'critical'
                          ? 'bg-danger-100 text-danger-700'
                          : 'bg-warning-100 text-warning-700'
                      }`}
                    >
                      {finding.severity}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

function SummaryCard({
  title,
  icon: Icon,
  total,
  open,
  critical,
  high,
  href,
}: {
  title: string
  icon: any
  total: number
  open: number
  critical: number
  high: number
  href: string
}) {
  return (
    <Link
      href={href}
      className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <Icon className="text-primary-600" size={24} />
      </div>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600">Total</span>
          <span className="font-semibold">{total}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Open</span>
          <span className="font-semibold text-primary-600">{open}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Critical</span>
          <span className="font-semibold text-danger-600">{critical}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">High</span>
          <span className="font-semibold text-warning-600">{high}</span>
        </div>
      </div>
    </Link>
  )
}

