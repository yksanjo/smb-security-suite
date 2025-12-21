'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Layout } from '@/components/Layout'
import api from '@/lib/api'
import { Plus, Cloud as CloudIcon, AlertCircle } from 'lucide-react'

export default function CloudPage() {
  const queryClient = useQueryClient()
  const [showAddAccount, setShowAddAccount] = useState(false)

  const { data: accounts } = useQuery({
    queryKey: ['cloud-accounts'],
    queryFn: async () => {
      const response = await api.get('/cloud/accounts')
      return response.data.accounts
    },
  })

  const { data: findings } = useQuery({
    queryKey: ['cloud-findings'],
    queryFn: async () => {
      const response = await api.get('/cloud/findings')
      return response.data.findings
    },
  })

  const syncMutation = useMutation({
    mutationFn: async (accountId: string) => {
      return api.post(`/cloud/accounts/${accountId}/sync`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cloud-findings'] })
      queryClient.invalidateQueries({ queryKey: ['cloud-accounts'] })
    },
  })

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Cloud Network Monitor</h1>
            <p className="text-gray-600">Monitor VPC flow logs and IAM events for suspicious activity</p>
          </div>
          <button
            onClick={() => setShowAddAccount(true)}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-700 flex items-center gap-2"
          >
            <Plus size={20} />
            Add Cloud Account
          </button>
        </div>

        {/* Cloud Accounts */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Cloud Accounts</h2>
          {accounts?.length === 0 ? (
            <p className="text-gray-600">No cloud accounts configured yet.</p>
          ) : (
            <div className="space-y-3">
              {accounts?.map((account: any) => (
                <div
                  key={account.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                >
                  <div>
                    <div className="font-semibold flex items-center gap-2">
                      <CloudIcon size={20} />
                      {account.account_name || account.account_id}
                    </div>
                    <div className="text-sm text-gray-600">
                      {account.cloud_provider.toUpperCase()} • {account.account_id}
                    </div>
                    {account.last_sync_at && (
                      <div className="text-xs text-gray-500 mt-1">
                        Last synced: {new Date(account.last_sync_at).toLocaleString()}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => syncMutation.mutate(account.id)}
                    disabled={syncMutation.isPending}
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-primary-700 disabled:opacity-50"
                  >
                    {syncMutation.isPending ? 'Syncing...' : 'Sync Now'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Findings */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Network Security Findings</h2>
          {findings?.length === 0 ? (
            <p className="text-gray-600">No findings yet. Sync a cloud account to get started.</p>
          ) : (
            <div className="space-y-3">
              {findings?.map((finding: any) => (
                <div
                  key={finding.id}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle
                          className={
                            finding.severity === 'critical'
                              ? 'text-danger-500'
                              : finding.severity === 'high'
                              ? 'text-warning-500'
                              : 'text-gray-500'
                          }
                          size={20}
                        />
                        <span className="font-semibold">{finding.title}</span>
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            finding.severity === 'critical'
                              ? 'bg-danger-100 text-danger-700'
                              : finding.severity === 'high'
                              ? 'bg-warning-100 text-warning-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {finding.severity}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{finding.ai_explanation}</p>
                      {finding.source_ip && finding.destination_ip && (
                        <p className="text-xs text-gray-500">
                          {finding.source_ip} → {finding.destination_ip} ({finding.protocol})
                        </p>
                      )}
                    </div>
                    <div className="ml-4">
                      <select
                        value={finding.status}
                        onChange={(e) => {
                          api.patch(`/cloud/findings/${finding.id}`, {
                            status: e.target.value,
                          })
                          queryClient.invalidateQueries({ queryKey: ['cloud-findings'] })
                        }}
                        className="text-sm border border-gray-300 rounded px-2 py-1"
                      >
                        <option value="open">Open</option>
                        <option value="acknowledged">Acknowledged</option>
                        <option value="resolved">Resolved</option>
                        <option value="false_positive">False Positive</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

