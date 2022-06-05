export default function response (status: number, body: any) {
  return {
    status: status || 500,
    body: body || 'Server Error!'
  }
}
