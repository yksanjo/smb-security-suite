'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Layout } from '@/components/Layout'
import api from '@/lib/api'
import { Plus, Search, AlertCircle } from 'lucide-react'

export default function AttackSurfacePage() {
  const queryClient = useQueryClient()
  const [showAddRepo, setShowAddRepo] = useState(false)

  const { data: repos } = useQuery({
    queryKey: ['attack-surface-repos'],
    queryFn: async () => {
      const response = await api.get('/attack-surface/repos')
      return response.data.repos
    },
  })

  const { data: findings } = useQuery({
    queryKey: ['attack-surface-findings'],
    queryFn: async () => {
      const response = await api.get('/attack-surface/findings')
      return response.data.findings
    },
  })

  const addRepoMutation = useMutation({
    mutationFn: async (data: { repo_name: string; repo_url: string; github_token: string }) => {
      return api.post('/attack-surface/repos', data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attack-surface-repos'] })
      setShowAddRepo(false)
    },
  })

  const scanMutation = useMutation({
    mutationFn: async ({ repoId, github_token }: { repoId: string; github_token: string }) => {
      return api.post(`/attack-surface/repos/${repoId}/scan`, { github_token })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attack-surface-findings'] })
    },
  })

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Attack Surface Monitor</h1>
            <p className="text-gray-600">Monitor GitHub repositories for exposed secrets and vulnerabilities</p>
          </div>
          <button
            onClick={() => setShowAddRepo(true)}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-700 flex items-center gap-2"
          >
            <Plus size={20} />
            Add Repository
          </button>
        </div>

        {showAddRepo && (
          <AddRepoForm
            onSubmit={(data) => addRepoMutation.mutate(data)}
            onCancel={() => setShowAddRepo(false)}
            loading={addRepoMutation.isPending}
          />
        )}

        {/* Repositories */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Repositories</h2>
          {repos?.length === 0 ? (
            <p className="text-gray-600">No repositories added yet.</p>
          ) : (
            <div className="space-y-3">
              {repos?.map((repo: any) => (
                <div
                  key={repo.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                >
                  <div>
                    <div className="font-semibold">{repo.repo_name}</div>
                    <div className="text-sm text-gray-600">{repo.repo_url}</div>
                    {repo.last_scan_at && (
                      <div className="text-xs text-gray-500 mt-1">
                        Last scanned: {new Date(repo.last_scan_at).toLocaleString()}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      const token = prompt('Enter GitHub token:')
                      if (token) {
                        scanMutation.mutate({ repoId: repo.id, github_token: token })
                      }
                    }}
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-primary-700"
                  >
                    Scan Now
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Findings */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Security Findings</h2>
          {findings?.length === 0 ? (
            <p className="text-gray-600">No findings yet. Run a scan to get started.</p>
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
                      <p className="text-xs text-gray-500">Location: {finding.location}</p>
                    </div>
                    <div className="ml-4">
                      <select
                        value={finding.status}
                        onChange={(e) => {
                          api.patch(`/attack-surface/findings/${finding.id}`, {
                            status: e.target.value,
                          })
                          queryClient.invalidateQueries({ queryKey: ['attack-surface-findings'] })
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

function AddRepoForm({
  onSubmit,
  onCancel,
  loading,
}: {
  onSubmit: (data: any) => void
  onCancel: () => void
  loading: boolean
}) {
  const [repoName, setRepoName] = useState('')
  const [repoUrl, setRepoUrl] = useState('')
  const [githubToken, setGithubToken] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ repo_name: repoName, repo_url: repoUrl, github_token: githubToken })
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Add GitHub Repository</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Repository Name (owner/repo)
          </label>
          <input
            type="text"
            value={repoName}
            onChange={(e) => setRepoName(e.target.value)}
            placeholder="owner/repository"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Repository URL
          </label>
          <input
            type="url"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            placeholder="https://github.com/owner/repo"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            GitHub Token (for scanning)
          </label>
          <input
            type="password"
            value={githubToken}
            onChange={(e) => setGithubToken(e.target.value)}
            placeholder="ghp_..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-primary-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-700 disabled:opacity-50"
          >
            {loading ? 'Adding...' : 'Add Repository'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

