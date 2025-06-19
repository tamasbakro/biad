#!/bin/bash

# Bible, (c) Daniel Drotos 1995,96
#
# This CGI script is used to make a search
# in the WWW Bible
# ----------------------------------------
# 

cat <<EOF
Content-type: text/html

<html>
<HEAD>
<TITLE>A keres&eacute;s eredm&eacute;nye</TITLE>
</HEAD>

<BODY>
EOF

export PATH=/bin:/usr/bin:/usr/local/bin:/stuff/bin

PID=$$

if [ "$1" != "dani" ]; then
  case `hostname` in
    pigmy)
       if [ "$REQUEST_METHOD" = "POST" ]; then
         export QUERY_STRING=`cat`
       fi
       WHAT=`cgipars what|fly2html`
       IGNORE=`cgipars ignore`
       DEBUG=`cgipars debug`
       NOACCENT=`cgipars noaccent`
       NAME=`cgipars name`
       WHERE=`cgipars where`
    ;;

    *)
      eval `cgiparse -init`
      WHAT=`cgiparse -quiet -value what|fly2html`
      IGNORE=`cgiparse -quiet -value ignore`
      DEBUG=`cgiparse -quiet -value debug`
      NOACCENT=`cgiparse -quiet -value noaccent`
      NAME=`cgiparse -quiet -value name`
      WHERE=`cgiparse -quiet -value where`
    ;;
  esac
  OPT="";
  if [ "$IGNORE" = "on" ]; then
    OPT="$OPT -i"
  fi
  if [ "$NOACCENT" = "on" ]; then
    OPT="$OPT -n"
  fi
  if [ "$NAME" = "on" ]; then
    OPT="$OPT -N"
  fi
else
  WHAT=`echo $2|fly2html`
fi

if [ "$WHAT" = "" ]
then
  echo "Nem volt mit keresni."
else
  echo "<H1>\"${WHAT}\" el&ocirc;fordul&aacute;sa a Bibli&aacute;ban</H1>"
  echo "<OL>"

    RES_O=0; RES_UJ=0; RES_BD=0;
    if [ "$WHERE" = "o" -o "$WHERE" = "o-uj" ]; then
	bibsearch $OPT -d o $WHAT
	RES_O=$?
    fi
    if [ "$WHERE" = "uj" -o "$WHERE" = "o-uj" ]; then
	bibsearch $OPT -d uj $WHAT
	RES_UJ=$?
    fi
    if [ "$WHERE" = "bd" ]; then
	bibsearch $OPT -d bd $WHAT
	RES_BD=$?
    fi

  echo "</OL>"

  if [ $RES_O -eq 3 -a $RES_UJ -eq 3 -a $RES_BD -eq 3 ]; then
    echo "<p>\"<B>${WHAT}</B>\" nincs benne a Bibli&aacute;ban :-("
  fi

  echo "<HR>"

  VER=`bibsearch -v|awk '{print $3}'`
  cat <<EOF

A keres&eacute;st a <A
HREF="ftp://mazsola.iit.uni-miskolc.hu/pub/unix/www/wsrc"><B>HTML
keres&ocirc; program</B></A> ${VER} k&uuml;l&ouml;nleges
v&aacute;ltozata v&eacute;gezte. &copy; <A
HREF="mailto:drdani@mazsola.iit.uni-miskolc.hu">Dr&oacute;tos
D&aacute;niel</A>, 1996,97.

EOF
fi

cat <<EOF

</BODY>
</html>
EOF
