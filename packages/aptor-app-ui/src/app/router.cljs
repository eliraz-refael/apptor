(ns app.router
  (:require ["@reach/router" :refer [Router]]
			["@material-ui/core" :refer [Button]]
			[app.pages.register :refer [register-page]]
			[app.layout :refer [main-layout]]
			[hx.hooks :as hooks]
			[app.pages.agenda :refer [agenda-page]]
			[hx.react :as hx :refer [defnc]]))

(defnc config-page []
  (let [[value set-value] (hooks/useState "LALALA")]
	(defn handle-click [] (set-value "1212252"))
	[main-layout
	 [:div "this is the config page"
	  [:div value]
	  [Button {:onClick handle-click :color "primary" :variant "outlined"} "Push here"]
	  [Button {:onClick #(set-value "YES") :color "secondary" :variant "outlined"} "Or you can click here"]
	  ]]))

(defnc login-page []
  [:div "this is the login page"])

(defnc app-router []
  [Router
   [config-page {:path "/"}]
   [login-page {:path "/login"}]
   [agenda-page {:path "/agenda"}]
   [register-page {:path "/register"}]])
