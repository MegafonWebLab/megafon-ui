import React from 'react'
import { useConfig } from 'docz'
import Iframe from 'react-frame-component'

const CLEAR_PADDING = `<style> body { padding: 0; margin: 0; }  </style>`
const INITIAL_IFRAME_CONTENT = `<!DOCTYPE html><html><head> ${CLEAR_PADDING} </head><body><div></div></body></html>`

const IframeWrapper = ({ children, style }) => {
  const [containerHeight, setHeight] = React.useState()
  return (
    <Iframe
      initialContent={INITIAL_IFRAME_CONTENT}
      style={style}
    >
      {children}
    </Iframe>
  )
}

const NormalWrapper = ({ children, style }) => {
  return (
    <div style={style}>
      {children}
    </div>
  )
}

type WrapperProps = {
    useScoping?: boolean;
    content?: string;
    style?: {};
}

export const Wrapper: React.FC<WrapperProps> = ({ children, useScoping, style }) => {
  const {
    themeConfig: { useScopingInPlayground },
  } = useConfig()

  const Element =
    useScoping || useScopingInPlayground ? IframeWrapper : NormalWrapper

  return (
    <Element style={style}>
      {children}
    </Element>
  )
};
