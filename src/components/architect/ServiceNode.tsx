/* ============================================
   ServiceNode – ReactFlow カスタムノード
   ============================================ */
'use client';

import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import type { NodeProps, Node } from '@xyflow/react';
import AwsServiceIcon from './AwsServiceIcon';
import type { ServiceCategory, AwsServiceId } from '@/data/architect/types';

export interface ServiceNodeData {
  serviceId: AwsServiceId;
  label: string;
  category: ServiceCategory;
  color: string;
  [key: string]: unknown;
}

export type ServiceNodeType = Node<ServiceNodeData, 'service'>;

function ServiceNode({ data, selected }: NodeProps<ServiceNodeType>) {
  return (
    <div
      className={`
        relative px-3 py-2 rounded-lg border-2 min-w-[120px]
        transition-all duration-150 cursor-grab active:cursor-grabbing
        ${selected ? 'ring-2 ring-offset-1 ring-offset-transparent shadow-lg scale-105' : 'shadow-md hover:shadow-lg'}
      `}
      style={{
        background: `${data.color}10`,
        borderColor: selected ? data.color : `${data.color}50`,
        boxShadow: selected ? `0 0 0 2px ${data.color}` : undefined,
      }}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="!w-2.5 !h-2.5 !border-2 !rounded-full !-top-1.5"
        style={{ background: '#1e293b', borderColor: data.color }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-2.5 !h-2.5 !border-2 !rounded-full !-bottom-1.5"
        style={{ background: data.color, borderColor: data.color }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        className="!w-2.5 !h-2.5 !border-2 !rounded-full !-right-1.5"
        style={{ background: data.color, borderColor: data.color }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="left"
        className="!w-2.5 !h-2.5 !border-2 !rounded-full !-left-1.5"
        style={{ background: '#1e293b', borderColor: data.color }}
      />

      <div className="flex items-center gap-2">
        <AwsServiceIcon serviceId={data.serviceId} category={data.category} size={22} />
        <span className="text-xs font-bold text-slate-200 whitespace-nowrap">{data.label}</span>
      </div>
    </div>
  );
}

export default memo(ServiceNode);
