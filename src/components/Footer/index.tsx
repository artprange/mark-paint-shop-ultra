import { FaInstagram, FaWhatsapp, FaFacebook } from 'react-icons/fa'

import { SocialLink, Wrapper } from './styles'

const SOCIAL_LINKS = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/mark.paint.shop',
    Icon: FaFacebook,
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/markpaintshop/',
    Icon: FaInstagram,
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/5511986667681',
    Icon: FaWhatsapp,
  },
]

export default function Footer() {
  return (
    <Wrapper>
      <div className="credits">
        {SOCIAL_LINKS.map(({ label, href, Icon }) => (
          <SocialLink
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={label}
          >
            <Icon />
          </SocialLink>
        ))}
        {new Date().getFullYear()}
        <span>Mark Paint Shop</span>
        Todos os direitos reservados
      </div>
    </Wrapper>
  )
}
