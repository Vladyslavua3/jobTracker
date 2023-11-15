'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

import { Button } from '@nextui-org/button'
import MoonIcon from "@/components/ui/moonIcon";
import SunIcon from "@/components/ui/sunIcon";

enum themeEnum {
    light = 'light',
    dark = 'dark'
}

export default function ThemeSwitcher() {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <div className='flex gap-4'>
            {
                theme === themeEnum.dark &&
                <Button size='sm' variant='flat' onClick={() => setTheme(themeEnum.light)}>
                    <SunIcon />
                </Button>
            }
            {
                theme === themeEnum.light &&
                <Button size='sm' variant='flat' onClick={() => setTheme(themeEnum.dark)}>
                    <MoonIcon/>
                </Button>
            }
        </div>
    )
}