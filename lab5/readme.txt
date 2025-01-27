1. interpolation/one-way binding - Da, na primjer src/components/TeamList.vue - linija 17

2. two-way binding - Da, src/components/TeamList.vue - linija 42, upisom u varijablu searchQuery
ce se ispisati vrijednost te varijable u search bar-u ili se moze izravno u search bar-u zapisati neka vrijednost.
Tako da je ovdje pristuna dvosmjerna povezanost.

3. methods - Da, src/components/TeamList.vue - linija 62, nalazi se labela "methods:" i postoje ispod te labele nekoliko
definiranih metoda. (sortAlphabetically(), sortPoints(), setFavoriteTeam(team))

4. computed properties - Da, src/components/TeamList.vue - linija 47, nalazi se labela "computed:" i takoder ispod te labele 
su definirane nekoliko computed property-a (teamStore(), totalTeams(), ...)

5. scoped style - Da, src/components/TeamList.vue - linija 83, src/components/TeamDetails.vue - linija 31,...

6. lifecycle hook - Da, src/components/TeamList.vue - linija 74. Definiran je lifecyclehook komponente TeamList.vue.

7. routing (više stranica) - Da, src/main.js - linija 12, 13, 14. Definirani su url-ovi za routanje. 
Linija 12 je zadužena za root route.
Linija 13 je zadužena za routanje kroz mogućih 6 momčadi (i bookmarkable su)
Linija 14 je zadužena za catch all routanje (404 stranica)

8. (barem) dvije komponente - Da, src/components/TeamList.vue - komponenta sa stanjem, a src/components/TeamCard.vue je komponenta bez stanja.

9. barem jedna komponenta mora emitirati barem jedan event - Da, src/components/TeamCard.vue - linija 24. Kada se ta funkcija
pozove, ona će se emitirati i na roditeljsku komponentu TeamList.vue.

10. store (Pinia) - Da, src/store/teamStore.js (cijeli .js file)
Isto tako ona se kasnije poziva u nekoliko komponenata.

11. asinkroni dohvat podataka sa backenda - Ne


Svakako, u kodu postoje komentari koji "oznacavaju" svaku implementiranu funkcionalnost.
