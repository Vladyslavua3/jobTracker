import { create } from 'zustand'

type Store = {
    linkToResume: string,
    linkToCoverLetter:string
    setLinkToResume: (link:string) => void
    setLinkToCoverLetter: (link:string) => void
}

export const useFileLink = create<Store>()((set) => ({
    linkToResume: '',
    linkToCoverLetter:'',
    setLinkToResume: (link:string) => set((state) => ({ linkToResume: link })),
    setLinkToCoverLetter: (link:string) => set((state) => ({ linkToCoverLetter: link })),
}))
