(ns app.main
  (:require [hx.react :as hx :refer [defnc]]
			[cljss.core :refer-macros [inject-global]]
			[app.router :refer [app-router]]
			["react-dom" :as react-dom]))

(defnc App []
   [app-router])

(inject-global
 {"#app" {:height "100%"}})

(defn mount []
 (react-dom/render
   ;; hx/f transforms Hiccup into a React element.
   ;; We only have to use it when we want to use hiccup outside of `defnc` / `defcomponent`
   (hx/f [App {:initial-name "React in CLJS"}])
   (. js/document getElementById "app")))

(defn start []
  (js/console.log "Starting...")
  (.appendChild js/document.body (doto (.createElement js/document "div")
								   (-> (.setAttribute "id" "app"))))
  (mount))

(defn ^:export init []
  (start))

(defn ^:export reload! []
  (mount))
