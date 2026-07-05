import { useMemo } from 'react'
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  Controls,
  Handle,
  Position,
  MarkerType,
  type Node,
  type Edge,
  type NodeProps,
} from '@xyflow/react'
import type { GraphNode, GraphEdge } from '../data/blueprint'
import { useTheme } from '../context/ThemeContext'

const kindStyles: Record<GraphNode['kind'], { bg: string; ring: string; text: string }> = {
  client: { bg: 'linear-gradient(135deg,#3363ff33,#3363ff11)', ring: '#3363ff', text: '#3363ff' },
  edge: { bg: 'linear-gradient(135deg,#22d3ee33,#22d3ee11)', ring: '#22d3ee', text: '#0891b2' },
  service: { bg: 'linear-gradient(135deg,#a855f733,#a855f711)', ring: '#a855f7', text: '#9333ea' },
  data: { bg: 'linear-gradient(135deg,#10b98133,#10b98111)', ring: '#10b981', text: '#059669' },
  external: { bg: 'linear-gradient(135deg,#f59e0b33,#f59e0b11)', ring: '#f59e0b', text: '#d97706' },
  ai: { bg: 'linear-gradient(135deg,#ec489933,#ec489911)', ring: '#ec4899', text: '#db2777' },
}

type FlowNodeData = { label: string; sub?: string; kind: GraphNode['kind'] }

function CustomNode({ data }: NodeProps) {
  const d = data as FlowNodeData
  const s = kindStyles[d.kind]
  return (
    <div className="rf-node" style={{ background: s.bg, borderColor: `${s.ring}66`, color: 'inherit' }}>
      <Handle type="target" position={Position.Left} style={{ background: s.ring, border: 'none', width: 7, height: 7 }} />
      <div className="leading-tight">{d.label}</div>
      {d.sub && <div style={{ color: s.text }} className="mt-0.5 text-[10px] font-medium opacity-90">{d.sub}</div>}
      <Handle type="source" position={Position.Right} style={{ background: s.ring, border: 'none', width: 7, height: 7 }} />
    </div>
  )
}

const nodeTypes = { custom: CustomNode }

export default function FlowDiagram({
  nodes,
  edges,
  height = 460,
}: {
  nodes: GraphNode[]
  edges: GraphEdge[]
  height?: number
}) {
  const { theme } = useTheme()
  const dark = theme === 'dark'

  const rfNodes: Node[] = useMemo(
    () =>
      nodes.map((n) => ({
        id: n.id,
        type: 'custom',
        position: { x: n.x, y: n.y },
        data: { label: n.label, sub: n.sub, kind: n.kind },
      })),
    [nodes],
  )

  const rfEdges: Edge[] = useMemo(
    () =>
      edges.map((e) => ({
        id: e.id,
        source: e.source,
        target: e.target,
        label: e.label,
        animated: e.animated,
        style: { stroke: dark ? '#475569' : '#94a3b8', strokeWidth: 2 },
        labelStyle: { fontSize: 10, fill: dark ? '#94a3b8' : '#64748b', fontWeight: 600 },
        labelBgStyle: { fill: dark ? '#0c1018' : '#ffffff', fillOpacity: 0.85 },
        markerEnd: { type: MarkerType.ArrowClosed, color: dark ? '#475569' : '#94a3b8' },
      })),
    [edges, dark],
  )

  return (
    <div className="glass overflow-hidden rounded-2xl" style={{ height }}>
      <ReactFlow
        nodes={rfNodes}
        edges={rfEdges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.18 }}
        proOptions={{ hideAttribution: true }}
        nodesDraggable
        nodesConnectable={false}
        elementsSelectable={false}
        minZoom={0.4}
        maxZoom={1.6}
      >
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} color={dark ? '#1e293b' : '#e2e8f0'} />
        <Controls showInteractive={false} className="!border-none !bg-transparent" />
      </ReactFlow>
    </div>
  )
}
