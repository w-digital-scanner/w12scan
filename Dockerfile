FROM alpine:latest
MAINTAINER w8ay@qq.com
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.ustc.edu.cn/g' /etc/apk/repositories
RUN set -x \
    && apk update \
    && apk add python3
# install w12scan
RUN mkdir -p /opt/w12scan
COPY . /opt/w12scan

RUN set -x \
    && pip3 install -i https://pypi.tuna.tsinghua.edu.cn/simple -r /opt/w12scan/requirements.txt

WORKDIR /opt/w12scan
CMD ["python3","manage.py","makemigrations"]
CMD ["python3","manage.py","migrate"]

CMD ["rm","-f","/var/cache/apk/*"]
CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]

EXPOSE 8000

