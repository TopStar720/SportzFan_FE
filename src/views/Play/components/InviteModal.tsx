import { useState } from 'react'
import Modal, { ModalProps } from 'components/Modal'
import { classNames } from 'utils'

type UserData = {
  id: string
  name: string
}

interface UserItemProps extends UserData {
  isSelected: boolean
  onClick: (id: string) => void
}

interface InviteModalProps extends ModalProps {
  onInvite: (users: string[]) => void
}

const UserItem = ({ id, name, isSelected, onClick }: UserItemProps) => {
  return (
    <div
      className={classNames(
        'w-350 h-50 rounded-[5px] flex justify-between items-center pl-12 pr-16 py-10 mb-4',
        isSelected ? 'bg-danger-light' : 'bg-dark',
      )}
    >
      <div className="flex items-center">
        <img src="/assets/images/temp/avatar.png" className="w-30 h-30 rounded-full" />
        <p className="text-14 leading-20 text-sf-gray-300 ml-12">{name}</p>
      </div>
      <label className="checkbox-container cursor-pointer relative w-22 h-22">
        <input type="checkbox" className="w-0" onChange={() => onClick(id)} />
        <span className="checkmark absolute inset-0 bg-transparent w-22 h-22 border border-sf-zinc-600 rounded-[3px]" />
      </label>
    </div>
  )
}

const InviteModal = ({ show, onClose, onInvite }: InviteModalProps) => {
  const [users, setUsers] = useState<UserData[]>([
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'William Clark' },
    { id: '3', name: 'Amelia Ava' },
    { id: '4', name: 'Davies Oliver' },
    { id: '5', name: 'Sophia Grace' },
    { id: '6', name: 'Amelia Ava' },
    { id: '7', name: 'Davies Oliver' },
  ])
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])

  const onClickItem = (id: string) => {
    const matchedIdx = selectedUsers.findIndex((item) => item === id)
    if (matchedIdx === -1) {
      setSelectedUsers((prevState) => [...prevState, id])
    } else {
      setSelectedUsers((prevState) => [...prevState.slice(0, matchedIdx), ...prevState.slice(matchedIdx + 1)])
    }
  }
  return (
    <Modal show={show} onClose={onClose}>
      <div className="w-full max-w-400 bg-sf-zinc-900 rounded-[4px] flex flex-col items-center py-24 px-20">
        <p className="text-18 leading-27 text-white font-semibold font-poppins text-center">{'Invite Friends & Win'}</p>
        <div className="w-full h-18" />
        <input
          className="w-full border border-sf-zinc-600 rounded-[5px] bg-transparent px-12 py-8 text-12 leading-18 text-white font-medium font-poppins"
          placeholder="Search"
        />
        <div className="w-full h-16" />
        <div className="h-270 overflow-y-auto">
          {users.map((user) => (
            <UserItem
              key={`searched-user-item-${user.id}`}
              {...user}
              isSelected={!!selectedUsers.find((item) => item === user.id)}
              onClick={onClickItem}
            />
          ))}
        </div>
        <div className="w-full h-22" />
        <div className="flex justify-center">
          <button className="w-130 h-40 bg-secondary rounded-[4px]" onClick={onClose}>
            <span className="text-14 text-white uppercase">Cancel</span>
          </button>
          <button
            className="w-130 h-40 bg-danger rounded-[4px] ml-10"
            disabled={selectedUsers.length === 0}
            onClick={() => onInvite(selectedUsers)}
          >
            <span className="text-14 text-white uppercase">Invite</span>
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default InviteModal
