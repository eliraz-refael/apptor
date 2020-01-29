(ns app.components.top-bar
  (:require [hx.react :as hx :refer [defnc]]
			[cljss.core :refer-macros [defstyles]]
			["@material-ui/core" :as mui]
			[hx.hooks :as hooks]
			[app.hooks.fetch :refer [useHttp]]))

(defstyles app-bar-style []
  {:border-bottom "1px solid #ccc"})

(defnc app-top-bar []
  [mui/AppBar {:position "static" :color "default" :elevation 0 :className (app-bar-style)}
   [mui/Toolbar
	[mui/Typography {:variant "h6"} "Aptor"]]])
