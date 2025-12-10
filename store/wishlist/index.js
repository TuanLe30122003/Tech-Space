'use client'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const useWishlistStore = create(
    persist(
        (set, get) => ({
            // State
            wishlistItems: [],

            // Actions
            addToWishlist: (productId) => {
                const { wishlistItems } = get()

                // Kiểm tra xem sản phẩm đã có trong wishlist chưa
                if (!wishlistItems.includes(productId)) {
                    set({
                        wishlistItems: [...wishlistItems, productId]
                    })

                    return true // Thêm thành công
                }
                return false // Đã có trong wishlist
            },

            removeFromWishlist: (productId) => {
                const { wishlistItems } = get()
                const updatedWishlist = wishlistItems.filter(id => id !== productId)

                set({ wishlistItems: updatedWishlist })
            },

            toggleWishlist: (productId) => {
                const { wishlistItems, addToWishlist, removeFromWishlist } = get()

                if (wishlistItems.includes(productId)) {
                    removeFromWishlist(productId)
                    return false // Đã xóa
                } else {
                    addToWishlist(productId)
                    return true // Đã thêm
                }
            },

            isInWishlist: (productId) => {
                const { wishlistItems } = get()
                return wishlistItems.includes(productId)
            },

            getWishlistCount: () => {
                const { wishlistItems } = get()
                return wishlistItems.length
            },

            clearWishlist: () => {
                set({ wishlistItems: [] })
            },

            // Khởi tạo từ localStorage khi load (backward compatibility)
            initializeFromSession: () => {
                // Persist middleware đã tự động load, nhưng giữ lại để tương thích
                // Có thể migrate từ sessionStorage cũ sang localStorage nếu cần
                if (typeof window !== 'undefined') {
                    try {
                        // Migrate từ sessionStorage cũ nếu có
                        const oldSessionWishlist = sessionStorage.getItem('wishlist')
                        if (oldSessionWishlist) {
                            const parsedWishlist = JSON.parse(oldSessionWishlist)
                            const { wishlistItems } = get()
                            // Merge với wishlist hiện tại
                            const merged = [...new Set([...wishlistItems, ...parsedWishlist])]
                            set({ wishlistItems: merged })
                            sessionStorage.removeItem('wishlist') // Xóa sessionStorage cũ
                        }
                    } catch (error) {
                        console.error('Error migrating wishlist from sessionStorage:', error)
                    }
                }
            },

            // Đồng bộ với localStorage (backward compatibility)
            syncWithSession: () => {
                // Persist middleware đã tự động sync, nhưng giữ lại để tương thích
                // Không cần làm gì vì persist đã tự động xử lý
            }
        }),
        {
            name: 'wishlist-storage',
            storage: createJSONStorage(() => ({
                getItem: (name) => {
                    if (typeof window !== 'undefined') {
                        return localStorage.getItem(name)
                    }
                    return null
                },
                setItem: (name, value) => {
                    if (typeof window !== 'undefined') {
                        localStorage.setItem(name, value)
                    }
                },
                removeItem: (name) => {
                    if (typeof window !== 'undefined') {
                        localStorage.removeItem(name)
                    }
                }
            }))
        }
    )
)

export default useWishlistStore
