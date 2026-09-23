/**
 * The six-stage system presentation (spec section 8).
 *
 * The full BANK architecture also covers authorization and risk controls; the
 * spec is explicit that THIS homepage section keeps the simplified six-stage
 * story shown in the design. Extra stages belong on the platform page.
 */

export type StageIcon = 'observe' | 'analyze' | 'decide' | 'execute' | 'reconcile' | 'learn';

export interface SystemStageItem {
  id: StageIcon;
  label: string;
  description: string;
}

export const SYSTEM_STAGES: SystemStageItem[] = [
  { id: 'observe', label: 'Observe', description: 'Real-time data from across your financial life.' },
  { id: 'analyze', label: 'Analyze', description: 'AI models turn data into intelligence.' },
  { id: 'decide', label: 'Decide', description: 'Intelligent insights and recommendations.' },
  { id: 'execute', label: 'Execute', description: 'Move, exchange, or allocate with confidence.' },
  { id: 'reconcile', label: 'Reconcile', description: 'Everything balances in real time.' },
  { id: 'learn', label: 'Learn', description: 'The system continuously learns and improves.' },
];
