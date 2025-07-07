"use client"

import { useState, useMemo, useEffect } from "react"
import { MaterialReactTable, useMaterialReactTable, type MRT_ColumnDef, type MRT_Row } from "material-react-table"
import {
  Box,
  Chip,
  FormControl,
  MenuItem,
  Select,
  Typography,
  InputBase,
  InputLabel,
  IconButton,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
  Divider,
  useTheme,
  alpha,
  Card,
  CardContent,
  Stack,
  Badge,
  Collapse,
} from "@mui/material"
import {
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Warning as WarningIcon,
  Search as SearchIcon,
  Sort as SortIcon,
  ArrowDropDown as ArrowDropDownIcon,
  ExpandMore as ExpandMoreIcon,
  Assignment as AssignmentIcon,
  FilterAlt as FilterAltIcon,
  Refresh as RefreshIcon,
  ExpandLess as ExpandLessIcon,
  Dashboard as DashboardIcon,
} from "@mui/icons-material"

// Define types for our data
interface ProductPost {
  id: string
  brandName: string
  offerTitle: string
  postType: string
  status: "pending" | "approved" | "rejected" | "warning" | "completed"
  postRate: number
  quota: number
  dueDate?: string
  link?: string
  linkStatus?: "active" | "inactive" | "pending"
  creator?: string
  reviewer?: string
  mrCount?: number
  subPosts?: ProductPost[]
}

// Sample data
const sampleData: ProductPost[] = [
  {
    id: "1",
    brandName: "GreenPan",
    offerTitle: "GreenPan Ceramic Non-Stick Cookware",
    postType: "TikTok",
    status: "pending",
    postRate: 0.25, // 25% of posts approved
    quota: 40,
    reviewer: "John Doe",
    subPosts: [
      {
        id: "1-1",
        brandName: "GreenPan",
        offerTitle: "GreenPan Ceramic Non-Stick Cookware",
        postType: "TikTok",
        status: "pending",
        postRate: 0,
        quota: 40,
        dueDate: "2025-05-20",
        link: "https://tiktok.com/video/123",
        linkStatus: "pending",
        creator: "creator123",
        reviewer: "John Doe",
        mrCount: 0,
      },
      {
        id: "1-2",
        brandName: "GreenPan",
        offerTitle: "GreenPan Ceramic Non-Stick Cookware",
        postType: "TikTok",
        status: "approved",
        postRate: 1,
        quota: 40,
        dueDate: "2025-05-18",
        link: "https://tiktok.com/video/456",
        linkStatus: "active",
        creator: "creator456",
        reviewer: "Jane Smith",
        mrCount: 1,
      },
    ],
  },
  {
    id: "2",
    brandName: "GreenPan",
    offerTitle: "GreenPan Ceramic Non-Stick Cookware",
    postType: "Reels",
    status: "pending",
    postRate: 0,
    quota: 35,
    reviewer: "Jane Smith",
    subPosts: [
      {
        id: "2-1",
        brandName: "GreenPan",
        offerTitle: "GreenPan Ceramic Non-Stick Cookware",
        postType: "Reels",
        status: "pending",
        postRate: 0,
        quota: 35,
        dueDate: "2025-05-22",
        link: "",
        linkStatus: "pending",
        creator: "creator789",
        reviewer: "Jane Smith",
        mrCount: 0,
      },
    ],
  },
  {
    id: "3",
    brandName: "The Face Shop",
    offerTitle: "#1 Korean Skincare Wipes for Makeup Removal—Rice Water Bright Cleansing Facial Wipes",
    postType: "Reels",
    status: "completed",
    postRate: 1, // 100% of posts approved
    quota: 50,
    reviewer: "Mike Johnson",
    subPosts: [
      {
        id: "3-1",
        brandName: "The Face Shop",
        offerTitle: "#1 Korean Skincare Wipes for Makeup Removal—Rice Water Bright Cleansing Facial Wipes",
        postType: "Reels",
        status: "completed",
        postRate: 1,
        quota: 50,
        dueDate: "2025-05-10",
        link: "https://instagram.com/post/789",
        linkStatus: "active",
        creator: "creator101",
        reviewer: "Mike Johnson",
        mrCount: 2,
      },
    ],
  },
  {
    id: "4",
    brandName: "The Face Shop",
    offerTitle:
      "#1 Step to Glowy, Youthful Korean Skin? Start with The Face Shop's Hydro Sun Barrier 2-in-1 Moisturizer & Sunscreen",
    postType: "TikTok",
    status: "warning",
    postRate: 0.5, // 50% of posts approved
    quota: 75,
    reviewer: "Sarah Williams",
    subPosts: [
      {
        id: "4-1",
        brandName: "The Face Shop",
        offerTitle:
          "#1 Step to Glowy, Youthful Korean Skin? Start with The Face Shop's Hydro Sun Barrier 2-in-1 Moisturizer & Sunscreen",
        postType: "TikTok",
        status: "warning",
        postRate: 0.5,
        quota: 75,
        dueDate: "2025-05-25",
        link: "https://tiktok.com/video/321",
        linkStatus: "inactive",
        creator: "creator202",
        reviewer: "Sarah Williams",
        mrCount: 1,
      },
    ],
  },
]

// Status chip component with improved styling
const StatusChip = ({ status }: { status: ProductPost["status"] }) => {
  const theme = useTheme()

  const statusConfig = {
    pending: {
      color: theme.palette.warning.main,
      bgColor: alpha(theme.palette.warning.main, 0.1),
      icon: <WarningIcon fontSize="small" />,
      label: "Pending",
    },
    approved: {
      color: theme.palette.success.main,
      bgColor: alpha(theme.palette.success.main, 0.1),
      icon: <CheckCircleIcon fontSize="small" />,
      label: "Approved",
    },
    rejected: {
      color: theme.palette.error.main,
      bgColor: alpha(theme.palette.error.main, 0.1),
      icon: <CancelIcon fontSize="small" />,
      label: "Rejected",
    },
    warning: {
      color: theme.palette.warning.main,
      bgColor: alpha(theme.palette.warning.main, 0.1),
      icon: <WarningIcon fontSize="small" />,
      label: "Warning",
    },
    completed: {
      color: theme.palette.success.main,
      bgColor: alpha(theme.palette.success.main, 0.1),
      icon: <CheckCircleIcon fontSize="small" />,
      label: "Completed",
    },
  }

  const config = statusConfig[status]

  return (
    <Chip
      icon={config.icon}
      label={config.label}
      size="small"
      sx={{
        color: config.color,
        backgroundColor: config.bgColor,
        fontWeight: 500,
        "& .MuiChip-icon": {
          color: config.color,
        },
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          backgroundColor: alpha(config.color, 0.2),
        },
      }}
    />
  )
}

// Get status icon
const getStatusIcon = (status: ProductPost["status"]) => {
  const statusIcons = {
    pending: <WarningIcon color="warning" />,
    approved: <CheckCircleIcon color="success" />,
    rejected: <CancelIcon color="error" />,
    warning: <WarningIcon color="warning" />,
    completed: <CheckCircleIcon color="success" />,
  }

  return statusIcons[status]
}

// Main component
export default function ProductPostTable() {
  const theme = useTheme()
  const [mounted, setMounted] = useState(false)
  const [claimingPeriod, setClaimingPeriod] = useState("2025-05a (5/1 -5/8)")
  const [selectedOffers, setSelectedOffers] = useState<string[]>([])
  const [statusFilter, setStatusFilter] = useState<string>("")
  const [reviewerFilter, setReviewerFilter] = useState<string>("")
  const [searchTerm, setSearchTerm] = useState("")
  const [rowSelection, setRowSelection] = useState({})
  const [assignDialogOpen, setAssignDialogOpen] = useState(false)
  const [selectedReviewer, setSelectedReviewer] = useState("")
  const [filtersExpanded, setFiltersExpanded] = useState(true)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Define columns for parent rows (offers)
  const parentColumns = useMemo<MRT_ColumnDef<ProductPost>[]>(
    () => [
      {
        accessorKey: "brandName",
        header: "Brand Name",
        size: 150,
        Header: () => (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography fontWeight="bold" variant="subtitle2">
              Brand Name
            </Typography>
            <IconButton size="small">
              <SortIcon fontSize="small" />
            </IconButton>
          </Box>
        ),
        Cell: ({ cell }) => <Typography fontWeight="medium">{cell.getValue<string>()}</Typography>,
      },
      {
        accessorKey: "offerTitle",
        header: "Offer Title",
        size: 250,
        Header: () => (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography fontWeight="bold" variant="subtitle2">
              Offer Title
            </Typography>
            <IconButton size="small">
              <SortIcon fontSize="small" />
            </IconButton>
          </Box>
        ),
        Cell: ({ row }) => (
          <Box>
            <Typography fontWeight="medium">{row.original.offerTitle}</Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
            >
              <Chip
                label={row.original.postType}
                size="small"
                sx={{
                  height: 20,
                  fontSize: "0.7rem",
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  color: theme.palette.primary.main,
                  fontWeight: 500,
                }}
              />
              <span style={{ marginLeft: 4 }}>drop down to every product post in this offer</span>
            </Typography>
          </Box>
        ),
      },
      {
        accessorKey: "postRate",
        header: "Post Rate",
        size: 120,
        Header: () => (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography fontWeight="bold" variant="subtitle2">
              Post Rate
            </Typography>
            <IconButton size="small">
              <SortIcon fontSize="small" />
            </IconButton>
          </Box>
        ),
        Cell: ({ cell }) => {
          const rate = cell.getValue<number>()
          const percentage = (rate * 100).toFixed(0)

          // Color based on percentage
          let color = theme.palette.info.main
          if (rate >= 0.8) color = theme.palette.success.main
          else if (rate >= 0.5) color = theme.palette.warning.main
          else if (rate < 0.3) color = theme.palette.error.main

          return (
            <Typography
              fontWeight="medium"
              sx={{
                color,
                backgroundColor: alpha(color, 0.1),
                padding: "4px 8px",
                borderRadius: "4px",
                display: "inline-block",
              }}
            >
              {percentage}%
            </Typography>
          )
        },
      },
      {
        accessorKey: "quota",
        header: "Quota",
        size: 100,
        Header: () => (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography fontWeight="bold" variant="subtitle2">
              Quota
            </Typography>
            <IconButton size="small">
              <SortIcon fontSize="small" />
            </IconButton>
          </Box>
        ),
        Cell: ({ cell }) => <Typography fontWeight="medium">{cell.getValue<number>()}</Typography>,
      },
      {
        accessorKey: "status",
        header: "Status",
        size: 150,
        Cell: ({ cell }) => <StatusChip status={cell.getValue<ProductPost["status"]>()} />,
      },
      {
        accessorKey: "reviewer",
        header: "Reviewer",
        size: 150,
        Header: () => (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography fontWeight="bold" variant="subtitle2">
              Reviewer
            </Typography>
            <IconButton size="small">
              <SortIcon fontSize="small" />
            </IconButton>
          </Box>
        ),
        Cell: ({ cell }) => (
          <Chip
            label={cell.getValue<string>()}
            size="small"
            sx={{
              backgroundColor: alpha(theme.palette.primary.main, 0.1),
              color: theme.palette.primary.main,
              fontWeight: 500,
              "&:hover": {
                backgroundColor: alpha(theme.palette.primary.main, 0.2),
              },
            }}
          />
        ),
      },
    ],
    [theme],
  )

  // Define columns for child rows (individual posts)
  const childColumns = useMemo<MRT_ColumnDef<ProductPost>[]>(
    () => [
      {
        accessorKey: "brandName",
        header: "Brand Name",
        size: 150,
        Header: () => (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography fontWeight="bold" variant="subtitle2">
              Brand Name
            </Typography>
            <IconButton size="small">
              <SortIcon fontSize="small" />
            </IconButton>
          </Box>
        ),
      },
      {
        accessorKey: "offerTitle",
        header: "Offer Title",
        size: 250,
        Header: () => (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography fontWeight="bold" variant="subtitle2">
              Offer Title
            </Typography>
            <IconButton size="small">
              <SortIcon fontSize="small" />
            </IconButton>
          </Box>
        ),
      },
      {
        accessorKey: "status",
        header: "Post Status Icon",
        size: 150,
        Cell: ({ row }) => getStatusIcon(row.original.status),
      },
      {
        accessorKey: "status",
        id: "statusText",
        header: "Post Status",
        size: 150,
        Header: () => (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography fontWeight="bold" variant="subtitle2">
              Post Status
            </Typography>
            <IconButton size="small">
              <SortIcon fontSize="small" />
            </IconButton>
          </Box>
        ),
        Cell: ({ cell }) => <StatusChip status={cell.getValue<ProductPost["status"]>()} />,
      },
      {
        accessorKey: "dueDate",
        header: "Due Date (or extension date)",
        size: 200,
        Cell: ({ cell }) => {
          const date = cell.getValue<string>()
          // Check if date is approaching (within 5 days)
          const isApproaching = date && new Date(date) <= new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)

          return (
            <Typography
              fontWeight={isApproaching ? "bold" : "regular"}
              sx={{
                color: isApproaching ? theme.palette.warning.main : "inherit",
              }}
            >
              {date}
            </Typography>
          )
        },
      },
      {
        accessorKey: "link",
        header: "Link",
        size: 200,
        Cell: ({ cell }) => {
          const link = cell.getValue<string>()
          return link ? (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: theme.palette.primary.main,
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              {link.substring(0, 30)}...
            </a>
          ) : (
            <Typography color="text.secondary" fontStyle="italic">
              No link
            </Typography>
          )
        },
      },
      {
        accessorKey: "linkStatus",
        header: "Link Status",
        size: 120,
        Cell: ({ cell }) => {
          const status = cell.getValue<string>()
          if (!status)
            return (
              <Typography color="text.secondary" fontStyle="italic">
                N/A
              </Typography>
            )

          const statusConfig = {
            active: {
              color: theme.palette.success.main,
              bgColor: alpha(theme.palette.success.main, 0.1),
              label: "Active",
            },
            inactive: {
              color: theme.palette.error.main,
              bgColor: alpha(theme.palette.error.main, 0.1),
              label: "Inactive",
            },
            pending: {
              color: theme.palette.warning.main,
              bgColor: alpha(theme.palette.warning.main, 0.1),
              label: "Pending",
            },
          }

          const config = statusConfig[status as keyof typeof statusConfig]

          return (
            <Chip
              label={config.label}
              size="small"
              sx={{
                color: config.color,
                backgroundColor: config.bgColor,
                fontWeight: 500,
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  backgroundColor: alpha(config.color, 0.2),
                },
              }}
            />
          )
        },
      },
      {
        accessorKey: "creator",
        header: "Creator",
        size: 150,
        Header: () => (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography fontWeight="bold" variant="subtitle2">
              Creator
            </Typography>
            <IconButton size="small">
              <SortIcon fontSize="small" />
            </IconButton>
          </Box>
        ),
        Cell: ({ cell }) => (
          <Chip
            label={cell.getValue<string>()}
            size="small"
            sx={{
              backgroundColor: alpha(theme.palette.secondary.main, 0.1),
              color: theme.palette.secondary.main,
              fontWeight: 500,
              "&:hover": {
                backgroundColor: alpha(theme.palette.secondary.main, 0.2),
              },
            }}
          />
        ),
      },
      {
        accessorKey: "mrCount",
        header: "# of MR",
        size: 100,
        Cell: ({ cell }) => {
          const count = cell.getValue<number>()
          return (
            <Badge
              badgeContent={count}
              color={count > 0 ? "primary" : "default"}
              sx={{
                "& .MuiBadge-badge": {
                  fontSize: "0.75rem",
                  height: "20px",
                  minWidth: "20px",
                },
              }}
            >
              <Box sx={{ width: 24, height: 24 }} />
            </Badge>
          )
        },
      },
    ],
    [theme],
  )

  // Filter data based on status and reviewer filters
  const filteredData = useMemo(() => {
    return sampleData.filter((item) => {
      // Filter by status if a status filter is selected
      if (statusFilter && item.status !== statusFilter) {
        return false
      }

      // Filter by reviewer if a reviewer filter is selected
      if (reviewerFilter && item.reviewer !== reviewerFilter) {
        return false
      }

      return true
    })
  }, [statusFilter, reviewerFilter, sampleData])

  // Get unique reviewers for the filter dropdown
  const reviewers = useMemo(() => {
    const reviewerSet = new Set<string>()
    sampleData.forEach((item) => {
      if (item.reviewer) {
        reviewerSet.add(item.reviewer)
      }
    })
    return Array.from(reviewerSet)
  }, [sampleData])

  // Handle assigning reviewers to selected rows
  const handleAssignReviewer = () => {
    console.log("Assigning reviewer:", selectedReviewer, "to selected rows:", rowSelection)
    // In a real application, you would update the data here
    setAssignDialogOpen(false)
    setSelectedReviewer("")
    setRowSelection({})
  }

  // Check if any rows are selected
  const hasSelectedRows = Object.keys(rowSelection).length > 0

  // Always call useMaterialReactTable, but with empty data if not mounted
  const table = useMaterialReactTable({
    columns: parentColumns,
    data: mounted ? filteredData : [],
    enableColumnFilterModes: true,
    enableColumnOrdering: true,
    enableGrouping: true,
    enableColumnPinning: true,
    enableRowSelection: true,
    enableColumnFilters: true,
    enableSorting: true,
    enablePagination: true,
    enableExpanding: true,
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
    renderDetailPanel: ({ row }: { row: MRT_Row<ProductPost> }) => (
      <Box sx={{ p: 2, backgroundColor: alpha(theme.palette.background.paper, 0.5) }}>
        <MaterialReactTable
          columns={childColumns}
          data={row.original.subPosts || []}
          enableColumnFilters={false}
          enableTopToolbar={false}
          enableBottomToolbar={false}
          enablePagination={false}
          enableColumnActions={false}
          enableSorting={true}
          muiTableProps={{
            sx: {
              tableLayout: "fixed",
              boxShadow: theme.shadows[1],
              borderRadius: "8px",
              overflow: "hidden",
            },
          }}
          muiTableHeadCellProps={{
            sx: {
              backgroundColor: alpha(theme.palette.primary.main, 0.05),
            },
          }}
        />
      </Box>
    ),
    muiTableContainerProps: {
      sx: {
        maxHeight: "600px",
        borderRadius: "8px",
        boxShadow: theme.shadows[2],
      },
    },
    muiTableHeadCellProps: {
      sx: {
        backgroundColor: alpha(theme.palette.primary.main, 0.05),
      },
    },
    muiTableBodyRowProps: ({ row }) => ({
      sx: {
        cursor: "pointer",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          backgroundColor: alpha(theme.palette.primary.main, 0.05),
        },
      },
      onClick: () => {
        row.toggleExpanded()
      },
    }),
    initialState: {
      density: "comfortable",
    },
    renderTopToolbarCustomActions: () => (
      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        {hasSelectedRows && (
          <Tooltip title="Assign selected rows to a reviewer" arrow>
            <Button
              variant="contained"
              startIcon={<AssignmentIcon />}
              onClick={() => setAssignDialogOpen(true)}
              size="small"
              sx={{
                borderRadius: "8px",
                boxShadow: theme.shadows[2],
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  boxShadow: theme.shadows[4],
                  transform: "translateY(-2px)",
                },
              }}
            >
              Assign to Reviewer
            </Button>
          </Tooltip>
        )}
        <Tooltip title="Refresh data" arrow>
          <IconButton
            onClick={() => console.log("Refreshing data")}
            sx={{
              backgroundColor: alpha(theme.palette.primary.main, 0.1),
              "&:hover": {
                backgroundColor: alpha(theme.palette.primary.main, 0.2),
              },
            }}
          >
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
  })

  if (!mounted) {
    return (
      <Box sx={{ width: "100%", p: 4, textAlign: "center" }}>
        <Typography>Loading...</Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ width: "100%", backgroundColor: alpha(theme.palette.background.paper, 0.5), minHeight: "100vh" }}>
      <Box
        sx={{
          p: 2,
          backgroundColor: theme.palette.background.paper,
          boxShadow: theme.shadows[1],
          mb: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <DashboardIcon color="primary" />
          <Typography variant="h5" fontWeight="bold" color="primary.main">
            Product Posts (Matchmaking)
          </Typography>
        </Box>
        <Chip
          label={`Details View`}
          size="small"
          sx={{
            backgroundColor: alpha(theme.palette.primary.main, 0.1),
            color: theme.palette.primary.main,
            fontWeight: 500,
          }}
        />
      </Box>

      {/* Stats Cards */}
      <Box sx={{ px: 3, mb: 3 }}>
        <Stack direction="row" spacing={2}>
          <Card sx={{ flex: 1, boxShadow: theme.shadows[2], borderRadius: "8px" }}>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">
                Total Offers
              </Typography>
              <Typography variant="h4" fontWeight="bold" color="primary.main">
                {sampleData.length}
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ flex: 1, boxShadow: theme.shadows[2], borderRadius: "8px" }}>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">
                Pending Approval
              </Typography>
              <Typography variant="h4" fontWeight="bold" color="warning.main">
                {sampleData.filter((item) => item.status === "pending").length}
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ flex: 1, boxShadow: theme.shadows[2], borderRadius: "8px" }}>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">
                Completed
              </Typography>
              <Typography variant="h4" fontWeight="bold" color="success.main">
                {sampleData.filter((item) => item.status === "completed").length}
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ flex: 1, boxShadow: theme.shadows[2], borderRadius: "8px" }}>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">
                Average Post Rate
              </Typography>
              <Typography variant="h4" fontWeight="bold" color="info.main">
                {Math.round((sampleData.reduce((acc, item) => acc + item.postRate, 0) / sampleData.length) * 100)}%
              </Typography>
            </CardContent>
          </Card>
        </Stack>
      </Box>

      {/* Top filters */}
      <Paper
        sx={{
          p: 2,
          mb: 3,
          mx: 3,
          borderRadius: "8px",
          boxShadow: theme.shadows[2],
          transition: "all 0.3s ease-in-out",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: filtersExpanded ? 2 : 0,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <FilterAltIcon color="primary" />
            <Typography variant="subtitle1" fontWeight="bold">
              Filters
            </Typography>
          </Box>
          <IconButton onClick={() => setFiltersExpanded(!filtersExpanded)}>
            {filtersExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </Box>

        <Collapse in={filtersExpanded}>
          <Box>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, alignItems: "center" }}>
              <FormControl sx={{ minWidth: 200 }} size="small">
                <InputLabel>Claiming Period</InputLabel>
                <Select
                  value={claimingPeriod}
                  onChange={(e) => setClaimingPeriod(e.target.value as string)}
                  label="Claiming Period"
                  IconComponent={ExpandMoreIcon}
                  sx={{ borderRadius: "8px" }}
                >
                  <MenuItem value="2025-05a (5/1 -5/8)">2025-05a (5/1 -5/8)</MenuItem>
                  <MenuItem value="2025-04b (4/15-4/30)">2025-04b (4/15-4/30)</MenuItem>
                  <MenuItem value="2025-04a (4/1-4/14)">2025-04a (4/1-4/14)</MenuItem>
                </Select>
              </FormControl>

              <FormControl sx={{ minWidth: 200 }} size="small">
                <InputLabel>Offer Title (multi-select)</InputLabel>
                <Select
                  multiple
                  value={selectedOffers}
                  onChange={(e) => setSelectedOffers(e.target.value as string[])}
                  renderValue={(selected) => selected.join(", ")}
                  label="Offer Title"
                  IconComponent={ArrowDropDownIcon}
                  sx={{ borderRadius: "8px" }}
                >
                  <MenuItem value="GreenPan (TikTok)">GreenPan (TikTok)</MenuItem>
                  <MenuItem value="GreenPan (Reels)">GreenPan (Reels)</MenuItem>
                  <MenuItem value="The Face Shop (Reels)">The Face Shop (Reels)</MenuItem>
                  <MenuItem value="The Face Shop (TikTok)">The Face Shop (TikTok)</MenuItem>
                </Select>
              </FormControl>

              <FormControl sx={{ minWidth: 200 }} size="small">
                <InputLabel>Post Status</InputLabel>
                <Select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as string)}
                  label="Post Status"
                  IconComponent={ArrowDropDownIcon}
                  sx={{ borderRadius: "8px" }}
                >
                  <MenuItem value="">All Statuses</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="approved">Approved</MenuItem>
                  <MenuItem value="rejected">Rejected</MenuItem>
                  <MenuItem value="warning">Warning</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                </Select>
              </FormControl>

              <FormControl sx={{ minWidth: 200 }} size="small">
                <InputLabel>Reviewer</InputLabel>
                <Select
                  value={reviewerFilter}
                  onChange={(e) => setReviewerFilter(e.target.value as string)}
                  label="Reviewer"
                  IconComponent={ArrowDropDownIcon}
                  sx={{ borderRadius: "8px" }}
                >
                  <MenuItem value="">All Reviewers</MenuItem>
                  {reviewers.map((reviewer) => (
                    <MenuItem key={reviewer} value={reviewer}>
                      {reviewer}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  bgcolor: alpha(theme.palette.primary.main, 0.05),
                  p: 1,
                  borderRadius: "8px",
                  ml: "auto",
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                  },
                }}
              >
                <SearchIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                <InputBase
                  placeholder="Search: creator handle or email"
                  sx={{
                    minWidth: 220,
                    color: theme.palette.text.primary,
                  }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Box>
            </Box>
          </Box>
        </Collapse>
      </Paper>

      {/* The MRT table */}
      <Box sx={{ px: 3, pb: 3 }}>
        <MaterialReactTable table={table} />
      </Box>

      {/* Assign Reviewer Dialog */}
      {mounted && (
        <Dialog
          open={assignDialogOpen}
          onClose={() => setAssignDialogOpen(false)}
          PaperProps={{
            sx: {
              borderRadius: "12px",
              boxShadow: theme.shadows[5],
            },
          }}
        >
          <DialogTitle
            sx={{
              borderBottom: `1px solid ${theme.palette.divider}`,
              backgroundColor: alpha(theme.palette.primary.main, 0.05),
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <AssignmentIcon color="primary" />
              <Typography fontWeight="bold">Assign Reviewer</Typography>
            </Box>
          </DialogTitle>
          <DialogContent sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Select a reviewer to assign to the selected {Object.keys(rowSelection).length} item(s).
            </Typography>
            <FormControl fullWidth>
              <InputLabel>Select Reviewer</InputLabel>
              <Select
                value={selectedReviewer}
                onChange={(e) => setSelectedReviewer(e.target.value as string)}
                label="Select Reviewer"
                sx={{ borderRadius: "8px" }}
              >
                {reviewers.map((reviewer) => (
                  <MenuItem key={reviewer} value={reviewer}>
                    {reviewer}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions sx={{ p: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
            <Button
              onClick={() => setAssignDialogOpen(false)}
              sx={{
                borderRadius: "8px",
                fontWeight: 500,
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAssignReviewer}
              variant="contained"
              color="primary"
              disabled={!selectedReviewer}
              sx={{
                borderRadius: "8px",
                fontWeight: 500,
                boxShadow: theme.shadows[2],
                "&:hover": {
                  boxShadow: theme.shadows[4],
                },
              }}
            >
              Assign
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  )
}
