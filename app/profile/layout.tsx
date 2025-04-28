"use client"

import React from "react"
import { useAuth } from "@/contexts/auth-context"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter, usePathname } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated && !user) {
      router.push("/auth/login")
    }
  }, [isAuthenticated, user, router])

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-[50vh]">
          <p>Loading profile...</p>
        </div>
      </div>
    )
  }

  const getCurrentTab = () => {
    if (pathname === "/profile") return "profile"
    if (pathname === "/profile/posts") return "posts"
    if (pathname === "/profile/settings") return "settings"
    return "profile"
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
          <Avatar className="h-24 w-24">
            <AvatarImage src={user.profile_picture || "/placeholder-user.jpg"} alt={user.username} />
            <AvatarFallback>{user.username.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="text-center md:text-left">
            <h1 className="text-2xl font-bold">{user.full_name || user.username}</h1>
            <p className="text-gray-500 dark:text-gray-400">@{user.username}</p>
            {user.bio && <p className="mt-2">{user.bio}</p>}
          </div>
        </div>
        <Separator className="my-6" />
        <Tabs value={getCurrentTab()} className="w-full">
          <TabsList className="w-full justify-start">
            <Link href="/profile" passHref>
              <TabsTrigger value="profile" className="flex-1 md:flex-none">Profile</TabsTrigger>
            </Link>
            <Link href="/profile/posts" passHref>
              <TabsTrigger value="posts" className="flex-1 md:flex-none">My Posts</TabsTrigger>
            </Link>
            <Link href="/profile/settings" passHref>
              <TabsTrigger value="settings" className="flex-1 md:flex-none">Settings</TabsTrigger>
            </Link>
          </TabsList>
        </Tabs>
      </Card>
      <div className="mt-6">
        {children}
      </div>
    </div>
  )
}