// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  token: string
}

type Error = {
  code: number
  message: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data | Error>) {
  const { email, password } = req.body
  if (email !== 'test@test.com') {
    res.status(401).json({ code: 10000, message: 'Incorrect email' })
  } else if (password !== '123123123') {
    res.status(401).json({ code: 10001, message: 'Incorrect password' })
  } else {
    res
      .status(200)
      .json({
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
      })
  }
}
