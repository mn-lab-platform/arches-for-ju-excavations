from rest_framework.permissions import BasePermission


def has_plugin_access(user):
    """Allow signed-in superusers and members of the Plugin Access group."""
    return user.is_authenticated and (
        user.is_superuser or user.groups.filter(name='Plugin Access').exists()
    )


class HasPluginAccess(BasePermission):
    def has_permission(self, request, view):
        return has_plugin_access(request.user)
