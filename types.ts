// Types for the Product Post data
export interface ProductPost {
  id: string
  brandName: string
  offerTitle: string
  postType: string
  quota: number
  postRateOriginal: number
  postRateWithExtension: number
  postRateAfterClaimDate: number
  missing: boolean
  extensions: string[]
  status: "pending" | "approved" | "rejected" | "warning" | "completed"
  platform: string
  assignedTo?: string
  link?: string
  linkStatus?: "active" | "inactive" | "pending"
  creator?: string
  mrCount?: number
  dueDate?: string
  statusIcon?: string
}

// Types for the stats display
export interface ProductPostStats {
  submitted: number
  expected: number
  pending: number
  rejected: number
  warning: number
  approved: number
  completed: number
  additionalContent: number
  adminContent: number
  publishedContent: number
}
