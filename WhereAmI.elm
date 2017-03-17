-- elm-lang/core
import Task

-- elm-lang/geolocation
import Geolocation exposing (Location)

-- elm-lang/html
import Html exposing (Html)


type alias Model =
  Result Geolocation.Error (Maybe Location)


type Msg
  = Update (Result Geolocation.Error Location)


init : (Model, Cmd Msg)
init =
  ( Ok Nothing
  , Task.attempt Update Geolocation.now
  )


subscriptions : Model -> Sub Msg
subscriptions _ =
  Geolocation.changes (Update << Ok)


view : Model -> Html Msg
view model =
  Html.div
    []
    [ Html.h1
        []
        [ Html.text "Where Am I?" ]
    , Html.div
        []
        [ Html.text (toString model) ]
    ]


update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    Update result ->
      ( Result.map Just result
      , Cmd.none
      )


main : Program Never Model Msg
main =
  Html.program
    { init = init
    , subscriptions = subscriptions
    , update = update
    , view = view
    }
