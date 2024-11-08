import { atom } from "jotai"

export const userListAtom = atom<{ userCount: number }>({ userCount: 0 })

export const chatAtom = atom<{ id: string; message: string }[]>([])
