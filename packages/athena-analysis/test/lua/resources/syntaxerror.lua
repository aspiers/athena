function event(key, arg1, arg2)
  contract.event("event", key, arg1, arg2)
end

function set(key, arg1, arg2)
  system.setItem(key, {intVal=arg1, stringVal=arg2})
end

function get(ke
  return system.getItem(key)
end
