import SectionCard from '../common/SectionCard.jsx'
import StatusBadge from '../common/StatusBadge.jsx'
import { useApiHealth } from '../../hooks/useApiHealth.js'
import { formatTimestamp } from '../../utils/formatters.js'

function IntegrationStatus() {
  const { health, database, isLoading, error } = useApiHealth()
  const apiOnline = Boolean(health?.status === 'ok')
  const dbConfigured = Boolean(database?.configured)

  return (
    <SectionCard>
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">
            API status
          </h2>
          <p className="mt-2 max-w-2xl text-zinc-600">
            The frontend talks to Express through service modules. MongoDB
            Atlas and Anthropic are ready for private values in your local env.
          </p>
        </div>
        <StatusBadge
          status={isLoading ? 'neutral' : apiOnline ? 'success' : 'danger'}
        >
          {isLoading ? 'Checking API' : apiOnline ? 'API online' : 'API offline'}
        </StatusBadge>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-lg bg-zinc-50 p-4">
          <p className="text-sm font-semibold text-zinc-950">Express</p>
          <p className="mt-2 text-sm text-zinc-600">
            {error || health?.message || 'Waiting for a health response.'}
          </p>
          <p className="mt-3 text-xs text-zinc-500">
            Last checked: {formatTimestamp(health?.timestamp)}
          </p>
        </div>

        <div className="rounded-lg bg-zinc-50 p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-zinc-950">
              MongoDB Atlas
            </p>
            <StatusBadge status={dbConfigured ? 'success' : 'warning'}>
              {dbConfigured ? 'Configured' : 'Needs env'}
            </StatusBadge>
          </div>
          <p className="mt-2 text-sm text-zinc-600">
            {database?.message || 'Add MONGODB_URI to connect Atlas.'}
          </p>
        </div>
      </div>
    </SectionCard>
  )
}

export default IntegrationStatus
