export interface Application {
  id: string;
  status: string;
  program: {
    name: string;
  };
  submission_date: string;
}

export interface SidebarItem {
  icon: React.ElementType;
  text: string;
  active: boolean;
  onClick: () => void;
}

export interface ApplicationListProps {
  applications: Application[];
  getStatusColor: (status: string) => string;
  isLoading: boolean;
}
