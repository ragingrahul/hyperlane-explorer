import type { providers } from 'ethers';

// TODO consider reconciling with SDK's MessageStatus
export enum MessageStatus {
  Unknown = 'unknown',
  Pending = 'pending',
  Delivered = 'delivered',
  Failing = 'failing',
}

export interface MessageTxStub {
  timestamp: number;
  hash: string;
  from: Address;
}

export interface MessageTx extends MessageTxStub {
  to: Address;
  blockHash: string;
  blockNumber: number;
  mailbox: Address;
  nonce: number;
  gasLimit: number;
  gasPrice: number;
  effectiveGasPrice;
  gasUsed: number;
  cumulativeGasUsed: number;
  maxFeePerGas: number;
  maxPriorityPerGas: number;
}

export interface MessageStub {
  status: MessageStatus;
  id: string; // Database id
  msgId: string; // Message hash
  nonce: number; // formerly leafIndex
  sender: Address;
  recipient: Address;
  originChainId: ChainId;
  originDomainId: number;
  destinationChainId: ChainId;
  destinationDomainId: number;
  origin: MessageTxStub;
  destination?: MessageTxStub;
  isPiMsg?: boolean;
}

export interface Message extends MessageStub {
  body: string;
  decodedBody?: string;
  origin: MessageTx;
  destination?: MessageTx;
  totalGasAmount?: string;
  totalPayment?: string;
  numPayments?: number;
}

export interface ExtendedLog extends providers.Log {
  timestamp?: number;
  from?: Address;
  to?: Address;
}

// Type of body for tenderly POST requests https://docs.tenderly.co/simulations-and-forks/simulation-api/using-simulation-api
export interface SimulateBody {
  save: boolean;
  save_if_fails: boolean;
  simulation_type: string;
  network_id: ChainId;
  from: Address; //can be any address, doesn't matter
  to: Address;
  input: string;
  gas: number;
  gas_price: number | null;
  value: number;
}
