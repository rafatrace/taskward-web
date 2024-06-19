import styles from './styles.module.css'
import { useNavigate } from '@tanstack/react-router'
import { useSession } from '@/providers/SessionProvider'
import sha256 from 'sha256'
import useClickOutside from '@/hooks/useClickOutside'
import { useState } from 'react'
import { cn } from '@/utils/styles'
import Option from '@/components/molecules/Option'
import Icon from '@/components/atoms/Icon'
import { useSidebar } from '@/providers/SidebarProvider'

const UserOptions = () => {
  // Services
  const optionsModalRef = useClickOutside<HTMLDivElement>(() => {
    closeOptions()
  })
  const { closeSidebar } = useSidebar()

  // Services
  const { user, signOut } = useSession()
  const navigate = useNavigate()

  // Local state
  const [isOpen, setOpen] = useState<boolean>(false)

  /**
   * Redirect and sign out user
   */
  const signOutUser = () => {
    navigate({ to: '/' })
    signOut()
  }

  // Get avatar
  const hashedEmail = sha256(user?.username)
  const gravatarUrl = `https://www.gravatar.com/avatar/${hashedEmail}`

  // Optons controller
  const openOptions = () => setOpen(true)
  const closeOptions = () => setOpen(false)

  return (
    <div className={styles.container}>
      <div className={styles.userInfo} data-ignore-click-outside onClick={openOptions}>
        <img src={gravatarUrl} className={styles.avatar} />
        <span>{user?.name}</span>
        <Icon type="chevron-down" color="var(--n70)" size={14} />
      </div>
      <div ref={optionsModalRef} className={cn(styles.optionsModal, { [styles.open]: isOpen })}>
        <Option icon="settings" message="Settings" action={() => console.log('open settings')} />
        <Option icon="sign-out" message="Sign out" action={signOutUser} />
      </div>
      <div className={styles.hideSidebar} onClick={closeSidebar}>
        <Icon type="hide-sidebar" size={20} color="var(--n60)" />
      </div>
    </div>
  )
}

export default UserOptions
