FROM alpine:edge
MAINTAINER w8ay@qq.com
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.ustc.edu.cn/g' /etc/apk/repositories
RUN set -x \
    && apk update \
    && apk add python3 \
    && apk add bash
# install w12scan
RUN mkdir -p /opt/w12scan
COPY . /opt/w12scan

RUN set -x \
    && pip3 install -i https://pypi.tuna.tsinghua.edu.cn/simple -r /opt/w12scan/requirements.txt \
    && rm -f /var/cache/apk/* \
    && chmod a+x /opt/w12scan/dockerconf/start.sh

WORKDIR /opt/w12scan
ENTRYPOINT ["/opt/w12scan/dockerconf/start.sh"]

EXPOSE 8000
CMD ["/usr/bin/tail", "-f", "/dev/null"]
