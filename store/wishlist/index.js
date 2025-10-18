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

                    // Lưu vào sessionStorage
                    if (typeof window !== 'undefined') {
                        sessionStorage.setItem('wishlist', JSON.stringify([...wishlistItems, productId]))
                    }

                    return true // Thêm thành công
                }
                return false // Đã có trong wishlist
            },

            removeFromWishlist: (productId) => {
                const { wishlistItems } = get()
                const updatedWishlist = wishlistItems.filter(id => id !== productId)

                set({ wishlistItems: updatedWishlist })

                // Cập nhật sessionStorage
                if (typeof window !== 'undefined') {
                    sessionStorage.setItem('wishlist', JSON.stringify(updatedWishlist))
                }
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

                // Xóa khỏi sessionStorage
                if (typeof window !== 'undefined') {
                    sessionStorage.removeItem('wishlist')
                }
            },

            // Khởi tạo từ sessionStorage khi load
            initializeFromSession: () => {
                if (typeof window !== 'undefined') {
                    const storedWishlist = sessionStorage.getItem('wishlist')
                    if (storedWishlist) {
                        try {
                            const parsedWishlist = JSON.parse(storedWishlist)
                            set({ wishlistItems: parsedWishlist })
                        } catch (error) {
                            console.error('Error parsing wishlist from sessionStorage:', error)
                            sessionStorage.removeItem('wishlist')
                        }
                    }
                }
            },

            // Đồng bộ với sessionStorage
            syncWithSession: () => {
                if (typeof window !== 'undefined') {
                    const { wishlistItems } = get()
                    sessionStorage.setItem('wishlist', JSON.stringify(wishlistItems))
                }
            }
        }),
        {
            name: 'wishlist-storage',
            storage: createJSONStorage(() => ({
                getItem: (name) => {
                    if (typeof window !== 'undefined') {
                        return sessionStorage.getItem(name)
                    }
                    return null
                },
                setItem: (name, value) => {
                    if (typeof window !== 'undefined') {
                        sessionStorage.setItem(name, value)
                    }
                },
                removeItem: (name) => {
                    if (typeof window !== 'undefined') {
                        sessionStorage.removeItem(name)
                    }
                }
            }))
        }
    )
)

export default useWishlistStore
