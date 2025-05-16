export const gradients = {
  title: {
    primary: "bg-gradient-to-r from-[#E0F2FE] via-[#93C5FD] to-[#3B82F6] bg-clip-text text-transparent font-semibold",
    hover: "hover:from-[#BAE6FD] hover:via-[#7DD3FC] hover:to-[#38BDF8]",
    animation: "animate-gradient-x",
  },
  button: {
    primary: {
      base: "bg-gradient-to-r from-[#0F172A] via-[#1E3A8A] to-[#1E40AF]",
      hover: "hover:from-[#1E3A8A] hover:via-[#1E40AF] hover:to-[#2563EB]",
    },
    secondary: {
      base: "bg-gradient-to-r from-[#1E3A8A] via-[#1E40AF] to-[#2563EB]",
      hover: "hover:from-[#1E40AF] hover:via-[#2563EB] hover:to-[#3B82F6]",
    },
  },
} as const; 