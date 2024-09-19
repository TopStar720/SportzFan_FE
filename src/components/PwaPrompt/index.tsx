import { Fragment, useEffect, useState } from 'react'

import { checkForIOS } from 'utils'

import ShareIcon from './ShareIcon'
import HomeScreenIcon from './HomeScreenIcon'

const PwaPrompt = () => {
  const [isiOS13AndUp, setIsiOS13AndUp] = useState<boolean>(false)
  const [visible, setVisible] = useState<boolean>(false)

  useEffect(() => {
    setIsiOS13AndUp(/OS (13|14)/.test(window.navigator.userAgent))
    const prompted = JSON.parse(window.localStorage.getItem('PwaPrompt'))
    if (!prompted && checkForIOS()) {
      setVisible(true)
    }
  }, [])

  const onClose = () => {
    window.localStorage.setItem('PwaPrompt', JSON.stringify(true))
    setVisible(false)
  }

  const onTransitionOut = (evt: any) => {
    if (!visible) {
      evt.currentTarget.style.display = 'none'
    }
  }

  return (
    <Fragment>
      <div
        className={`pwaPromptOverlay ${visible ? 'visible' : 'hidden'} ${
          isiOS13AndUp ? 'modern' : 'legacy'
        } iOSPWA-overlay`}
        aria-label="Close"
        role="button"
        onClick={onClose}
        onTransitionEnd={onTransitionOut}
      />
      <div
        className={`pwaPrompt ${visible ? 'visible' : 'hidden'} ${isiOS13AndUp ? 'modern' : 'legacy'} iOSPWA-container`}
        aria-describedby="pwa-prompt-description"
        aria-labelledby="pwa-prompt-title"
        role="dialog"
        onTransitionEnd={onTransitionOut}
      >
        <div className="pwaPromptHeader iOSPWA-header">
          <p id="pwa-prompt-title" className="pwaPromptTitle iOSPWA-title">
            Add to Home Screen
          </p>
          <button className="pwaPromptCancel iOSPWA-cancel" onClick={onClose}>
            Cancel
          </button>
        </div>
        <div className="pwaPromptBody iOSPWA-body">
          <div className="pwaPromptDescription iOSPWA-description">
            <p id="pwa-prompt-description" className="pwaPromptCopy iOSPWA-description-copy">
              This website has app functionality. Add it to your home screen to use it in fullscreen and while offline.
            </p>
          </div>
        </div>
        <div className="pwaPromptInstruction iOSPWA-steps">
          <div className="pwaPromptInstructionStep iOSPWA-step1">
            <ShareIcon className="pwaPromptShareIcon iOSPWA-step1-icon" modern={isiOS13AndUp} />
            <p className="pwaPromptCopy bold iOSPWA-step1-copy">{`1) Press the 'Share' button on the menu bar below.`}</p>
          </div>
          <div className="pwaPromptInstructionStep iOSPWA-step2">
            <HomeScreenIcon className="pwaPromptHomeIcon iOSPWA-step2-icon" modern={isiOS13AndUp} />
            <p className="pwaPromptCopy bold iOSPWA-step2-copy">{`2) Press 'Add to Home Screen'.`}</p>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default PwaPrompt
