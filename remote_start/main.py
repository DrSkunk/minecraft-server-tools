from werkzeug.wrappers import Request, Response
from wakeonlan import send_magic_packet

@Request.application
def application(request):
    send_magic_packet('ff.ff.ff.ff.ff.ff')
    return Response('Sending WOL packet')

if __name__ == '__main__':
    from werkzeug.serving import run_simple
    run_simple('0.0.0.0', 5000, application)